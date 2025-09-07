// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract ForensicChain {
    enum Role { None, Court, Officer, Forensic, Lawyer }
    enum EvidenceType { Image, Video, Document, Other }

    struct Evidence {
        string evidenceId;          
        string cid;        
        string hashOriginal; 
        EvidenceType evidenceType;  
        address submittedBy;        
        bool confirmed;             
        uint256 submittedAt;        
        address[] chainOfCustody;   
    }
   
    struct FIR {
        string firId;               
        address filedBy;     
        string description;     
        uint256 timestamp;          
        bool promotedToCase;        
        string associatedCaseId;    
    }

    struct Case {
        string caseId;              
        string title;               
        string description;         
        address createdBy;        
        bool seal;                
        bool open;                
        string[] tags;              
        uint256 evidenceCount;     
    }

    address public owner;          
    bool public isSystemLocked;    

    mapping(address => Role) public globalRoles;                               
    mapping(string => FIR) public firs;                                         

    // New: store FIR evidence separately until FIR is promoted to a case
    mapping(string => mapping(uint256 => Evidence)) public firEvidenceMapping;
    mapping(string => uint256) public firEvidenceCount;

    mapping(string => Case) public cases;                                       
    mapping(string => mapping(address => Role)) public caseRoles;              

    mapping(string => mapping(address => bool)) public evidenceConfirmed;       
    mapping(bytes32 => bool) public usedCIDHash;                               
    mapping(string => address[]) public caseAuditTrail;                         
    mapping(string => mapping(uint => mapping(address => bool))) public evidenceAccessed; 
    mapping(string => mapping(uint256 => Evidence)) public caseEvidenceMapping;
    string[] public caseIds;

    event EvidenceSubmitted(string indexed caseId, string evidenceId, string cid, address submitter);
    event EvidenceAccessed(string indexed caseId, uint256 indexed index, address accessor);
    event EvidenceConfirmed(string indexed caseId, uint256 indexed index, address confirmer);
    event CaseCreated(string indexed caseId, string indexed firId, address creator);
    event CaseStatusChanged(string indexed caseId, bool statusSealed, bool open);
    event RoleAssigned(string indexed caseId, address indexed user, Role role);
    event FIRFiled(string indexed firId, address indexed filedBy);

    modifier onlyRole(Role role) {
        require(globalRoles[msg.sender] == role, "Unauthorized role");
        _;
    }

    modifier onlyCourt() {
        require(globalRoles[msg.sender] == Role.Court, "Only Court can perform this action");
        _;
    }

    modifier onlyCaseAssigned(string memory caseId) {
        require(caseRoles[caseId][msg.sender] != Role.None, "Not assigned to case");
        _;
    }

    modifier caseOpen(string memory caseId) {
        require(cases[caseId].open && !cases[caseId].seal, "Case is not open or is sealed");
        _;
    }

    modifier notLocked() {
        require(!isSystemLocked, "System is in emergency lock");
        _;
    }

    constructor() {
        owner = msg.sender;
        globalRoles[msg.sender] = Role.Court;
    }

    function toggleSystemLock() external onlyCourt {
        isSystemLocked = !isSystemLocked;
    }

    function setGlobalRole(address user, Role role) external onlyCourt {
        require(role != Role.None, "Cannot assign None role");
        globalRoles[user] = role;
    }

    function fileFIR(string memory firId, string memory description) external notLocked onlyRole(Role.Officer) {
        require(firs[firId].filedBy == address(0), "FIR already exists");
        firs[firId] = FIR({
            firId: firId,
            filedBy: msg.sender,
            description: description,
            timestamp: block.timestamp,
            promotedToCase: false,
            associatedCaseId: ""
        });
        emit FIRFiled(firId, msg.sender);
    }

    /**
     * Submit evidence to an FIR (only before promotion)
     * Evidence will be stored off the case until FIR is promoted.
     */
    function submitFIREvidence(
        string memory firId,
        string memory evidenceId,
        string memory cid,
        string memory hashOriginal,
        EvidenceType evidenceType
    ) external notLocked {
        require(globalRoles[msg.sender] == Role.Officer || globalRoles[msg.sender] == Role.Forensic, "Unauthorized");
        require(firs[firId].filedBy != address(0), "FIR not found");
        // Must not be promoted yet (we store evidence to FIR while pending)
        require(!firs[firId].promotedToCase, "FIR already promoted to case");

        bytes32 unique = keccak256(abi.encodePacked(cid));
        require(!usedCIDHash[unique], "Duplicate evidence detected");

        // Create Evidence in memory, preserving empty chainOfCustody
        Evidence memory e = Evidence({
            evidenceId: evidenceId,
            cid: cid,
            hashOriginal: hashOriginal,
            evidenceType: evidenceType,
            submittedBy: msg.sender,
            confirmed: false,
            submittedAt: block.timestamp,
            chainOfCustody: new address[](0)
        });

        // Store under FIR mapping
        uint256 idx = firEvidenceCount[firId];
        firEvidenceMapping[firId][idx] = e;
        firEvidenceCount[firId] = idx + 1;

        usedCIDHash[unique] = true;

        // Emit EvidenceSubmitted using firId in the caseId position (minimal change)
        emit EvidenceSubmitted(firId, evidenceId, cid, msg.sender);
    }

    function _addNewEvidence(string memory caseId, Evidence memory e) internal {
        Case storage c = cases[caseId];
        caseEvidenceMapping[caseId][c.evidenceCount] = e;
        c.evidenceCount++;
    }

    /**
     * Promote an FIR to a Case.
     * After creating the case, migrate all FIR evidence into the case.
     */
    function createCaseFromFIR(
        string memory caseId,
        string memory firId,
        string memory title,
        string memory description,
        string[] memory tags
    ) external notLocked onlyCourt {
        require(cases[caseId].createdBy == address(0), "Case already exists");
        require(firs[firId].filedBy != address(0), "FIR not found");
        require(!firs[firId].promotedToCase, "FIR already promoted");

        // Initialize case
        Case storage c = cases[caseId];
        c.caseId = caseId;
        c.title = title;
        c.description = description;
        c.createdBy = msg.sender;
        c.seal = false;
        c.open = true;
        c.tags = tags;
        c.evidenceCount = 0;

        // Migrate FIR evidence into the newly created case
        uint256 fCount = firEvidenceCount[firId];
        for (uint256 i = 0; i < fCount; i++) {
            // Read FIR evidence from storage
            Evidence storage fe = firEvidenceMapping[firId][i];

            // Copy chainOfCustody to memory
            uint256 custodyLen = fe.chainOfCustody.length;
            address[] memory custody = new address[](custodyLen);
            for (uint256 j = 0; j < custodyLen; j++) {
                custody[j] = fe.chainOfCustody[j];
            }

            // Construct memory Evidence preserving fields
            Evidence memory newE = Evidence({
                evidenceId: fe.evidenceId,
                cid: fe.cid,
                hashOriginal: fe.hashOriginal,
                evidenceType: fe.evidenceType,
                submittedBy: fe.submittedBy,
                confirmed: fe.confirmed,
                submittedAt: fe.submittedAt,
                chainOfCustody: custody
            });

            // Add to case
            _addNewEvidence(caseId, newE);

            // Emit EvidenceSubmitted for case so off-chain indexers see it as case evidence
            emit EvidenceSubmitted(caseId, fe.evidenceId, fe.cid, fe.submittedBy);

            // delete old storage entry to free space
            delete firEvidenceMapping[firId][i];
        }

        // Clear FIR evidence count
        firEvidenceCount[firId] = 0;

        // Mark FIR promoted and link case id
        firs[firId].promotedToCase = true;
        firs[firId].associatedCaseId = caseId;

        caseIds.push(caseId);

        emit CaseCreated(caseId, firId, msg.sender);
    }

    function assignCaseRole(string memory caseId, address user, Role role) external notLocked onlyCourt {
        require(role != Role.None, "Cannot assign None role");
        caseRoles[caseId][user] = role;
        caseAuditTrail[caseId].push(user);
        emit RoleAssigned(caseId, user, role);
    }

    function submitCaseEvidence(
        string memory caseId,
        string memory evidenceId,
        string memory cid,
        string memory hashOriginal,
        EvidenceType evidenceType
    ) external notLocked onlyCaseAssigned(caseId) caseOpen(caseId) {
        require(
            globalRoles[msg.sender] == Role.Officer || globalRoles[msg.sender] == Role.Forensic,
            "Unauthorized role to submit evidence"
        );

        bytes32 unique = keccak256(abi.encodePacked(cid));
        require(!usedCIDHash[unique], "Duplicate evidence detected");

        Evidence memory e = Evidence({
            evidenceId: evidenceId,
            cid: cid,
            hashOriginal: hashOriginal,
            evidenceType: evidenceType,
            submittedBy: msg.sender,
            confirmed: false,
            submittedAt: block.timestamp,
            chainOfCustody: new address[](0)
        });

        _addNewEvidence(caseId, e);
        usedCIDHash[unique] = true;
        emit EvidenceSubmitted(caseId, evidenceId, cid, msg.sender);
    }

    function confirmCaseEvidence(string memory caseId, uint256 index) external notLocked onlyCaseAssigned(caseId) {
        require(index < cases[caseId].evidenceCount, "Invalid evidence index");
        Evidence storage e = caseEvidenceMapping[caseId][index];
        require(!e.confirmed, "Evidence already confirmed");
        require(e.submittedBy != msg.sender, "Cannot self-confirm evidence");
        e.confirmed = true;
        e.chainOfCustody.push(msg.sender);
        emit EvidenceConfirmed(caseId, index, msg.sender);
    }

    function sealCase(string memory caseId) external onlyCourt {
        Case storage c = cases[caseId];
        require(c.open, "Case already closed");
        c.seal = true;
        emit CaseStatusChanged(caseId, true, c.open);
    }

    function reopenCase(string memory caseId) external onlyCourt {
        Case storage c = cases[caseId];
        require(c.seal, "Case is not sealed");
        c.seal = false;
        c.open = true;
        emit CaseStatusChanged(caseId, false, true);
    }

    function closeCase(string memory caseId) external onlyCourt {
        Case storage c = cases[caseId];
        c.open = false;
        for (uint256 i = 0; i < caseAuditTrail[caseId].length; i++) {
            caseRoles[caseId][caseAuditTrail[caseId][i]] = Role.None;
        }
        emit CaseStatusChanged(caseId, c.seal, false);
    }

    function accessEvidence(string memory caseId, uint256 index) 
        external onlyCaseAssigned(caseId) returns (string memory) {
        require(index < cases[caseId].evidenceCount, "Invalid evidence index");
        Evidence storage e = caseEvidenceMapping[caseId][index];

        evidenceAccessed[caseId][index][msg.sender] = true;
        e.chainOfCustody.push(msg.sender);
        emit EvidenceAccessed(caseId, index, msg.sender);
        return e.cid; // Return CID for off-chain retrieval
    }

    function verifyEvidence(string memory caseId, uint256 index, string memory providedHash) 
        external view onlyCaseAssigned(caseId) returns (bool) {
        Evidence memory e = caseEvidenceMapping[caseId][index];
        require(index < cases[caseId].evidenceCount, "Invalid evidence index");
        return keccak256(abi.encodePacked(providedHash)) == keccak256(abi.encodePacked(e.hashOriginal));
    }

    function getMyRoleInCase(string memory caseId) external view returns (Role) {
        return caseRoles[caseId][msg.sender];
    }

    function getGlobalRole(address user) external view returns (Role) {
        return globalRoles[user];
    }

    function getCase(string memory caseId) external view returns (Case memory) {
        return cases[caseId];
    }

    function getFIR(string memory firId) external view returns (FIR memory) {
        return firs[firId];
    }

    function getEvidence(string memory caseId, uint256 index) external view returns (Evidence memory) {
        return caseEvidenceMapping[caseId][index];
    }

    function getAllCases() external view returns (Case[] memory) {
        Case[] memory allCases = new Case[](caseIds.length);
        for (uint i = 0; i < caseIds.length; i++) {
            allCases[i] = cases[caseIds[i]];
        }
        return allCases;
    }
}




