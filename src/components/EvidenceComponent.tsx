import React, { useEffect, useState } from "react";

import web3Service from "../services/web3Service";

export default function EvidenceComponent() {
  const [form, setForm] = useState({
    firId: "FIR-0001",
    evidenceId: "EVID-0001",
    cidEncrypted: "QmExampleCIDEncrypted",
    hashEncrypted: "0xEncryptedHashExample",
    hashOriginal: "0xOriginalHashExample",
    encryptionKeyHash: "0xEncryptionKeyHashExample",
    evidenceType: "0", // Default to Image
  });
  const [caseId, setCaseId] = useState("");
  const [evidenceCount, setEvidenceCount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch evidence count for a case
  async function fetchEvidenceCount(caseIdToFetch) {
    if (!caseIdToFetch) return;
    try {
      const caseData = await web3Service.getCase(caseIdToFetch);
      setEvidenceCount(caseData ? caseData.evidenceCount : null);
    } catch (e) {
      setEvidenceCount(null);
    }
  }

  // Add new evidence (write tx)
  async function addEvidence(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // web3Service expects the same params as the contract; include hashOriginal and encryptionKeyHash
      const success = await web3Service.submitFIREvidence(
        form.firId,
        form.evidenceId,
        form.cidEncrypted,
        form.hashEncrypted,
        form.hashOriginal,
        form.encryptionKeyHash,
        parseInt(form.evidenceType),
      );
      if (success) {
        alert("Evidence added!");
        if (caseId) fetchEvidenceCount(caseId);
      } else {
        alert("Transaction failed: Could not add evidence.");
      }
    } catch (e) {
      alert("Transaction failed: " + (e.message || e));
    }
    setLoading(false);
  }

  // Handle form input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle caseId input change
  function handleCaseIdChange(e) {
    setCaseId(e.target.value);
    fetchEvidenceCount(e.target.value);
  }

  return (
    <div>
      <h2>Forensic Ledger Guardian</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          Case ID to view evidence count:
          <input
            type="text"
            value={caseId}
            onChange={handleCaseIdChange}
            style={{ marginLeft: 8 }}
          />
        </label>
        <p>
          Evidence count for case:{" "}
          {caseId
            ? evidenceCount !== null
              ? evidenceCount
              : "Loading..."
            : "Enter a Case ID"}
        </p>
      </div>
      <form
        onSubmit={addEvidence}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 400,
        }}
      >
        <label>
          FIR ID:
          <input
            type="text"
            name="firId"
            value={form.firId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Evidence ID:
          <input
            type="text"
            name="evidenceId"
            value={form.evidenceId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CID (Encrypted):
          <input
            type="text"
            name="cidEncrypted"
            value={form.cidEncrypted}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Hash (Encrypted):
          <input
            type="text"
            name="hashEncrypted"
            value={form.hashEncrypted}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Hash (Original):
          <input
            type="text"
            name="hashOriginal"
            value={form.hashOriginal}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Encryption Key Hash (hex):
          <input
            type="text"
            name="encryptionKeyHash"
            value={form.encryptionKeyHash}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Evidence Type:
          <select
            name="evidenceType"
            value={form.evidenceType}
            onChange={handleChange}
            required
          >
            <option value="0">Image</option>
            <option value="1">Video</option>
            <option value="2">Document</option>
            <option value="3">Other</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Evidence"}
        </button>
      </form>
    </div>
  );
}
