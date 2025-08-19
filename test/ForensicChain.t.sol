// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.29;

import {Test} from "lib/forge-std/src/Test.sol";
import {ForensicChain} from "src/ForensicChain.sol";

contract ForensicChainTest is Test {
    ForensicChain public fc;
    address court = address(0x1);
    address officer = address(0x2);
    address forensic = address(0x3);
    address lawyer = address(0x4);

    function setUp() public {
        vm.prank(court);
        fc = new ForensicChain();
        vm.prank(court);
        fc.setGlobalRole(officer, ForensicChain.Role.Officer);
        vm.prank(court);
        fc.setGlobalRole(forensic, ForensicChain.Role.Forensic);
        vm.prank(court);
        fc.setGlobalRole(lawyer, ForensicChain.Role.Lawyer);
    }

    function testFileFIR() public {
        vm.prank(officer);
        fc.fileFIR("FIR1", "Test FIR");
        ForensicChain.FIR memory fir = fc.getFIR("FIR1");
        assertEq(fir.description, "Test FIR");
    }

    function testCreateCaseFromFIR() public {
        vm.prank(officer);
        fc.fileFIR("FIR2", "Desc");
        string[] memory tags = new string[](1);
        tags[0] = "tag1";
        vm.prank(court);
        fc.createCaseFromFIR("CASE1", "FIR2", "Title", "CaseDesc", tags);
        ForensicChain.Case memory caseData = fc.getCase("CASE1");
        assertEq(caseData.caseId, "CASE1");
        assertEq(caseData.title, "Title");
        assertEq(caseData.createdBy, court);
    }

    function testAssignCaseRole() public {
        vm.prank(officer);
        fc.fileFIR("FIR3", "Desc");
        string[] memory tags = new string[](1);
        tags[0] = "tag1";
        vm.prank(court);
        fc.createCaseFromFIR("CASE2", "FIR3", "Title", "CaseDesc", tags);
        vm.prank(court);
        fc.assignCaseRole("CASE2", lawyer, ForensicChain.Role.Lawyer);
        ForensicChain.Role role = fc.getMyRoleInCase("CASE2");
        assertEq(uint8(role), uint8(ForensicChain.Role.Court)); // Court is creator
        vm.prank(lawyer);
        role = fc.getMyRoleInCase("CASE2");
        assertEq(uint8(role), uint8(ForensicChain.Role.Lawyer));
    }

    function testSubmitAndConfirmEvidence() public {
        vm.prank(officer);
        fc.fileFIR("FIR4", "Desc");
        string[] memory tags = new string[](1);
        tags[0] = "tag1";
        vm.prank(court);
        fc.createCaseFromFIR("CASE3", "FIR4", "Title", "CaseDesc", tags);
        vm.prank(court);
        fc.assignCaseRole("CASE3", officer, ForensicChain.Role.Officer);
        vm.prank(officer);
        fc.submitCaseEvidence(
            "CASE3",
            "EVID1",
            "cidEnc",
            "hashEnc",
            "hashOrig",
            abi.encodePacked("keyHash"),
            ForensicChain.EvidenceType.Image
        );
        ForensicChain.Evidence memory e = fc.getEvidence("CASE3", 0);
        assertEq(e.evidenceId, "EVID1");
        assertEq(e.submittedBy, officer);
        assertEq(uint8(e.evidenceType), uint8(ForensicChain.EvidenceType.Image));
        // Confirm evidence
        vm.prank(court);
        fc.confirmCaseEvidence("CASE3", 0);
        e = fc.getEvidence("CASE3", 0);
        assertEq(e.confirmed, true);
    }
}
