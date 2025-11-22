// server.mjs
import express from 'express';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import mime from 'mime-types';
import { promisify } from 'util';
import stream from 'stream';

const pipeline = promisify(stream.pipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Supabase client (optional)
const _supabaseUrl = process.env.SUPABASE_URL || '';
const _supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';
if (!_supabaseUrl || !_supabaseKey) {
  console.warn('Supabase URL or Key missing. Supabase writes will likely fail. Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY) are set.');
}
const supabase = createClient(_supabaseUrl, _supabaseKey);

// Pinata JWT required for metadata API access
if (!process.env.PINATA_JWT) {
  console.warn('PINATA_JWT is not set. Pinata metadata lookups will fail.');
}

// Initialize Express app
const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:4000',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:8080'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Additional safety CORS middleware (keeps old behavior)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Debug logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Multer setup (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Small filename sanitizer
function sanitizeFilename(name) {
  return String(name || '')
    .replace(/[\r\n"]/g, '')                         // strip CR/LF and quotes
    .replace(/[/\\<>:;|?*\x00-\x1F]/g, '_')          // replace path/control chars
    .trim();
}

// In-memory cache for Pinata metadata: Map<cid, { name, expiry }>
const filenameCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function getPinnedFilenameFromPinata(cid) {
  // check cache
  const cached = filenameCache.get(cid);
  if (cached && cached.expiry > Date.now()) return cached.name;

  if (!process.env.PINATA_JWT) return null;

  const pinataMetaUrl = `https://api.pinata.cloud/data/pinList?hashContains=${encodeURIComponent(cid)}&status=pinned&limit=1`;
  const resp = await axios.get(pinataMetaUrl, {
    headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` },
    timeout: 10_000
  });

  const rows = resp.data?.rows;
  let candidate = null;
  if (Array.isArray(rows) && rows.length > 0) {
    // Pinata commonly stores name in rows[0].metadata.name
    candidate = rows[0]?.metadata?.name || rows[0]?.metadata?.keyvalues?.name || null;
  }

  if (candidate && typeof candidate === 'string') {
    const clean = sanitizeFilename(candidate);
    filenameCache.set(cid, { name: clean, expiry: Date.now() + CACHE_TTL_MS });
    return clean;
  }

  return null;
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'IPFS Backend is running!',
    endpoints: {
      upload: 'POST /upload (multipart form-data with file field "file")',
      retrieve: 'GET /retrieve/:cid'
    }
  });
});

// Upload endpoint: pins to Pinata with pinataMetadata.name and stores supabase metadata
app.post('/upload', (req, res, next) => {
  // multer middleware wrapper so we can keep async handler below
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log('Upload request body:', { body: req.body, file: req.file ? { originalname: req.file.originalname, mimetype: req.file.mimetype, size: req.file.size } : null });

    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Basic required fields check (adjust as per your app)
    if (!req.body.caseId || !req.body.evidenceId || req.body.evidenceType === undefined) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields (caseId, evidenceId, evidenceType)' });
    }

    // Prepare FormData for Pinata, include pinataMetadata with original filename
    const data = new FormData();
    data.append('file', req.file.buffer, { filename: req.file.originalname });
    const pinataMetadata = {
      name: req.file.originalname,
      // optional: keyvalues: { caseId: req.body.caseId, evidenceId: req.body.evidenceId }
    };
    data.append('pinataMetadata', JSON.stringify(pinataMetadata));

    const pinataResp = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          ...data.getHeaders()
        }
      }
    );

    const cid = pinataResp.data?.IpfsHash;
    console.log('Pinned to IPFS with CID:', cid);

    // Compute server-side SHA-256
    const hashOriginal = crypto.createHash('sha256').update(req.file.buffer).digest('hex');

    // Upsert to Supabase (if configured) -- non-fatal to the response
    if (_supabaseUrl && _supabaseKey) {
      try {
        const upsertPayload = {
          case_id: req.body.caseId,
          evidence_id: req.body.evidenceId,
          cid: cid,
          key_encrypted: req.body.key_encrypted || '',
          iv_encrypted: req.body.iv_encrypted || '',
          hash_original: hashOriginal,
          original_filename: req.file.originalname
        };

        const { data: supaData, error: supaError } = await supabase
          .from('evidence')
          .upsert(upsertPayload, { onConflict: ['case_id', 'evidence_id'] })
          .select();

        if (supaError) {
          console.error('Supabase upsert failed:', supaError);
          // Return 500 so caller knows metadata storage failed — but file is pinned
          return res.status(500).json({ error: 'Failed to store metadata in Supabase', details: supaError });
        }

        console.log('Supabase upsert succeeded:', supaData);
      } catch (dbErr) {
        console.error('Failed to store filename metadata or compute hash:', dbErr);
      }
    }

    // Return the CID and filename
    res.json({ cid, filename: req.file.originalname, sha256: hashOriginal });
  } catch (err) {
    console.error('Pinata / upload error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Upload failed', details: err.response?.data || err.message });
  }
});

// Retrieve endpoint: looks up original filename from Pinata metadata and streams file
app.get('/retrieve/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    // 1) Try to get original filename from Pinata metadata (cached)
    let originalFilename = null;
    try {
      originalFilename = await getPinnedFilenameFromPinata(cid);
    } catch (metaErr) {
      console.warn('Pinata metadata lookup failed or not present for CID', cid, metaErr?.message || metaErr);
      originalFilename = null;
    }

    // 2) Stream the file bytes from Pinata gateway
    const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
    const upstream = await axios.get(gatewayUrl, {
      responseType: 'stream',
      maxBodyLength: Infinity,
      maxContentLength: Infinity
    });

    const contentType = upstream.headers['content-type'] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    // 3) If Pinata metadata didn't have a filename, fallback to extension from content-type
    if (!originalFilename) {
      const ext = mime.extension(contentType) || 'bin';
      originalFilename = `file_${cid}.${ext}`;
    } else {
      // Ensure filename has an extension; if not, try to add from content-type
      if (!/\.[a-zA-Z0-9]{1,8}$/.test(originalFilename)) {
        const ext = mime.extension(contentType);
        if (ext) originalFilename = `${originalFilename}.${ext}`;
      }
    }

    originalFilename = sanitizeFilename(originalFilename);

    // 4) Set Content-Disposition (both filename and filename* for UTF-8)
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${originalFilename}"; filename*=UTF-8''${encodeURIComponent(originalFilename)}`
    );

    // 5) Stream upstream to client
    await pipeline(upstream.data, res);
    // pipeline will end response when upstream ends
  } catch (err) {
    console.error('Retrieve error for CID', cid, err?.response?.status, err?.message || err);
    const status = err.response?.status || 500;
    res.status(status).json({ error: 'Retrieve failed', details: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});
