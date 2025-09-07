## **ForensicChain System Flow**

### **1. Roles in the System**

The system has predefined roles with specific responsibilities:

* **Court** – Admin role; can lock the system, create cases, assign roles, and manage case statuses.
* **Officer** – Can file FIRs and submit evidence.
* **Forensic** – Can submit and handle evidence.
* **Lawyer** – Can access case evidence (if assigned to the case).
* **None** – Default role; no permissions.

These roles determine who can do what in the system.


### **2. Filing an FIR (First Information Report)**

1. An **Officer** files an FIR with a unique ID and description of the incident.
2. The FIR is stored on-chain with:

   * Filing officer’s address.
   * Timestamp.
   * A flag indicating whether it has been promoted to a case (initially false).

> At this stage, the FIR is just a preliminary report and no formal case exists yet.


### **3. Submitting Evidence to FIR**

1. Before an FIR is promoted, **Officer or Forensic personnel** can submit evidence associated with it.
2. Evidence includes:

   * A unique ID.
   * IPFS link (CID) of the file.
   * Original file hash for verification.
   * Type of evidence (image, video, document, etc.).
3. Each evidence is temporarily stored under the FIR.
4. The system prevents **duplicate evidence** by checking the CID hash.
5. Chain of custody starts empty because nobody has accessed or confirmed it yet.
6. An event is logged to notify the network of the submission.

> This ensures that **all FIR-related evidence is tracked and secured** even before the case exists.


### **4. Promoting FIR to Case**

1. Once the court decides to formally open a case, the FIR can be **promoted to a case**.
2. The process involves:

   * Creating a new **Case** with a unique ID, title, description, and tags.
   * Migrating all evidence from the FIR to the new case.
   * Preserving any existing chain of custody for the evidence.
   * Marking the FIR as promoted and linking it to the case.
3. FIR evidence now becomes **official case evidence** and is tracked permanently on-chain.


### **5. Assigning Roles for a Case**

1. The **Court** assigns specific users to the case with defined roles (Officer, Forensic, Lawyer).
2. Each assigned user can now perform actions on the case according to their role.
3. All role assignments are logged for auditing.


### **6. Submitting Evidence to Case**

1. Assigned users (Officer/Forensic) can submit new evidence directly to the case.
2. Each submission:

   * Has a unique ID and CID.
   * Checks for duplicates.
   * Adds the evidence to the case.
3. Evidence submissions are recorded on-chain and events are emitted.

> This ensures **new evidence is securely stored and traceable**.


### **7. Confirming Evidence**

1. Users assigned to the case can **confirm evidence** submitted by others.
2. Confirmation ensures:

   * The evidence is genuine and validated.
   * Chain of custody is updated with the confirmer’s address.
3. Users cannot confirm their own evidence, preventing conflicts of interest.

> Chain of custody grows as more people access or confirm evidence, maintaining **auditability**.


### **8. Accessing Evidence**

1. Assigned users can access evidence by retrieving its **IPFS link (CID)**.
2. Each access is logged in the chain of custody.
3. This ensures every view of evidence is tracked and accountable.


### **9. Verifying Evidence Integrity**

1. The system allows users to check the integrity of evidence.
2. Users provide the hash of the retrieved file.
3. The system compares it with the stored original hash to ensure the file hasn’t been tampered with.

> This ensures **data integrity for all evidence**.


### **10. Case Status Management**

1. **Seal Case** – Lock the case for modifications.
2. **Reopen Case** – Unlock the case if it was sealed.
3. **Close Case** – Permanently close the case and remove all role assignments.
4. Each action is logged on-chain for transparency.


### **11. Audit and Transparency**

* Every action (submission, confirmation, access, role assignment) emits an **event**.
* Events serve as a **transparent audit trail**, which can be monitored off-chain for reporting or legal purposes.
* Chain of custody tracks **who accessed or confirmed evidence** and when.


### **12. Storage Notes**

* **On-chain**: FIRs, cases, evidence metadata, roles, chain of custody.
* **Off-chain**: Actual evidence files are stored on IPFS; only their CID and hash are recorded on-chain.


### **13. Overall Workflow**

1. **Officer files FIR** → FIR exists in system.
2. **Evidence uploaded to FIR** → Temporary storage.
3. **Court promotes FIR to Case** → FIR evidence migrates to case.
4. **Roles assigned per case** → Users gain permissions.
5. **Evidence submitted to case** → Permanent tracking.
6. **Users confirm and access evidence** → Chain of custody updated.
7. **Evidence verified** → Integrity ensured.
8. **Case status managed** → Seal, reopen, or close.
9. **Audit trail maintained** → Full transparency.

**Key Features**

* Ensures **evidence integrity** (hashes, verification).
* Maintains **chain of custody** (who handled/accessed evidence).
* Enforces **role-based access control**.
* Supports **FIR → Case lifecycle**.
* Integrates **IPFS for file storage**, keeping blockchain lightweight.
* Fully **auditable**, transparent, and immutable.

