import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";
import crypto from "crypto";
import cors from 'cors';
import { createClient } from "@supabase/supabase-js";
import { ethers } from "ethers";
import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const abiPath = path.join(__dirname, 'ForensicChainABI.json');
const ForensicChainABI = JSON.parse(fs.readFileSync(abiPath, 'utf-8'));

const app = express();
const upload = multer();

// CORS: allow local frontend origins during development
app.use(cors({
  origin: [
    'http://localhost:4000',
    'http://localhost:5173',
    'http://localhost:8080',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080'
  ],
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Handle preflight quickly for all routes
app.options('*', cors());

app.use(express.json());

// Prefer service role key for server-side writes. If missing, log a clear
// warning so maintainers can set the correct env var.
const _supabaseUrl = process.env.SUPABASE_URL || '';
const _supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';
if (!_supabaseUrl || !_supabaseKey) {
  console.warn('Supabase URL or Key missing. Supabase writes will likely fail. Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY) are set.');
}
const supabase = createClient(_supabaseUrl, _supabaseKey);

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ForensicChainABI, wallet);

const ALLOWED_MIME = [
  "image/jpeg", "image/png", "image/jpg",
  "video/mp4", "video/mkv", "video/webm",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "audio/mpeg", "audio/wav"
];

// ------------------------- FIR Endpoints -------------------------

// 1. File FIR
app.post("/fir", async (req, res) => {
  try {
    const { firId, description } = req.body;
    if (!firId || !description) return res.status(400).json({ error: "firId and description required" });

    const tx = await contract.fileFIR(firId, description);
    await tx.wait();

    res.json({ message: "FIR filed successfully", firId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.reason || err.message });
  }
});

// 2. Submit FIR Evidence
app.post("/fir/:firId/upload", upload.single("file"), async (req, res) => {
  try {
    const { firId } = req.params;
    const { evidenceId, evidenceType } = req.body;
    const file = req.file;

    if (!file || !evidenceId || !evidenceType) return res.status(400).json({ error: "Missing required data" });
    if (!ALLOWED_MIME.includes(file.mimetype)) return res.status(400).json({ error: "File type not allowed" });

    // Encrypt file
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encryptedFile = Buffer.concat([cipher.update(file.buffer), cipher.final()]);

    // Upload to IPFS
    const formData = new FormData();
    formData.append("file", encryptedFile, file.originalname);
    const ipfsResp = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      { maxBodyLength: Infinity, headers: { Authorization: `Bearer ${process.env.PINATA_JWT}`, ...formData.getHeaders() } }
    );
    const cid = ipfsResp.data.IpfsHash;

    // Hash original file
    const hashOriginal = crypto.createHash("sha256").update(file.buffer).digest("hex");

    // Encrypt AES key with master password
    const masterKey = crypto.createHash("sha256").update(process.env.MASTER_PASSWORD).digest();
    const keyCipher = crypto.createCipheriv("aes-256-cbc", masterKey, iv);
    const keyEncrypted = Buffer.concat([keyCipher.update(key), keyCipher.final()]).toString("hex");
    const ivEncrypted = iv.toString("hex");

    // Store off-chain
    const { error } = await supabase.from("evidence").insert([{
      fir_id: firId,
      evidence_id: evidenceId,
      cid,
      key_encrypted: keyEncrypted,
      iv_encrypted: ivEncrypted,
      hash_original: hashOriginal
    }]);
    if (error) {
      console.error('Supabase insert failed:', error);
      return res.status(500).json({ error: 'Failed to store metadata in Supabase', details: error });
    }

    // Store on-chain
    const tx = await contract.submitFIREvidence(firId, evidenceId, cid, hashOriginal, evidenceType);
    await tx.wait();

    res.json({ message: "FIR evidence uploaded and recorded on-chain", cid });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "FIR upload failed: " + (err.reason || err.message) });
  }
});

// 3. Promote FIR to Case
app.post("/fir/:firId/promote", async (req, res) => {
  try {
    const { firId } = req.params;
    const { caseId, title, description, tags } = req.body;

    if (!firId || !caseId || !title || !description) return res.status(400).json({ error: "Missing required data" });

    const tx = await contract.createCaseFromFIR(caseId, firId, title, description, tags || []);
    await tx.wait();

    res.json({ message: "FIR promoted to case successfully", caseId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.reason || err.message });
  }
});

// ------------------------- Case Endpoints -------------------------

// 4. Submit Case Evidence
app.post("/case/:caseId/upload", upload.single("file"), async (req, res) => {
  try {
    const { caseId } = req.params;
    const { evidenceId, evidenceType } = req.body;
    const file = req.file;

    if (!file || !evidenceId || !evidenceType) return res.status(400).json({ error: "Missing required data" });
    if (!ALLOWED_MIME.includes(file.mimetype)) return res.status(400).json({ error: "File type not allowed" });

    // Encrypt file
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encryptedFile = Buffer.concat([cipher.update(file.buffer), cipher.final()]);

    // Upload to IPFS
    const formData = new FormData();
    formData.append("file", encryptedFile, file.originalname);
    const ipfsResp = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      { maxBodyLength: Infinity, headers: { Authorization: `Bearer ${process.env.PINATA_JWT}`, ...formData.getHeaders() } }
    );
    const cid = ipfsResp.data.IpfsHash;

    // Hash original file
    const hashOriginal = crypto.createHash("sha256").update(file.buffer).digest("hex");

    // Encrypt AES key with master password
    const masterKey = crypto.createHash("sha256").update(process.env.MASTER_PASSWORD).digest();
    const keyCipher = crypto.createCipheriv("aes-256-cbc", masterKey, iv);
    const keyEncrypted = Buffer.concat([keyCipher.update(key), keyCipher.final()]).toString("hex");
    const ivEncrypted = iv.toString("hex");

    // Store off-chain
    const { error } = await supabase.from("evidence").insert([{
      case_id: caseId,
      evidence_id: evidenceId,
      cid,
      key_encrypted: keyEncrypted,
      iv_encrypted: ivEncrypted,
      hash_original: hashOriginal
    }]);
    if (error) return res.status(500).json({ error: error.message });

    // Store on-chain
    const tx = await contract.submitCaseEvidence(caseId, evidenceId, cid, hashOriginal, evidenceType);
    await tx.wait();

    res.json({ message: "Case evidence uploaded and recorded on-chain", cid });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Case upload failed: " + (err.reason || err.message) });
  }
});

// 5. Confirm Evidence (Case or FIR promoted to Case)
app.post("/case/:caseId/confirm", async (req, res) => {
  try {
    const { caseId, index } = req.body;
    if (!caseId || index === undefined) return res.status(400).json({ error: "caseId and index required" });

    const tx = await contract.confirmCaseEvidence(caseId, index);
    await tx.wait();

    res.json({ message: "Evidence confirmed on-chain", caseId, index });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.reason || err.message });
  }
});

// 6. Retrieve Evidence (works for FIR-promoted or case)
app.get("/retrieve/:caseId/:evidenceId", async (req, res) => {
  try {
    let { caseId, evidenceId } = req.params;
    caseId = caseId.trim();
    evidenceId = evidenceId.trim();

    const { data, error } = await supabase.from("evidence")
      .select("*")
      .or(`case_id.eq.${caseId},fir_id.eq.${caseId}`)
      .eq("evidence_id", evidenceId)
      .single();

    if (error || !data) return res.status(404).json({ error: "Evidence not found" });

    const iv = Buffer.from(data.iv_encrypted, "hex");
    const masterKey = crypto.createHash("sha256").update(process.env.MASTER_PASSWORD).digest();
    const decipher = crypto.createDecipheriv("aes-256-cbc", masterKey, iv);
    const keyBuffer = Buffer.concat([decipher.update(Buffer.from(data.key_encrypted, "hex")), decipher.final()]);

    const fileResp = await axios.get(`https://${process.env.PINATA_GATEWAY}/ipfs/${data.cid}`, { responseType: "arraybuffer" });
    const encryptedFile = Buffer.from(fileResp.data);

    const fileDecipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);
    const decrypted = Buffer.concat([fileDecipher.update(encryptedFile), fileDecipher.final()]);

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${evidenceId}"`);
    res.send(decrypted);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Retrieve failed: " + err.message });
  }
});

app.listen(4000, () => console.log("Backend running at http://localhost:4000"));