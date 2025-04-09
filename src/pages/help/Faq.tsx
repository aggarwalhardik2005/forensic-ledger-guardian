
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-forensic-800 mb-6 flex items-center">
        <HelpCircle className="mr-2 h-6 w-6 text-forensic-accent" />
        Frequently Asked Questions
      </h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
            <CardDescription>Common questions about the ForensicLedger platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-is-forensicledger">
                <AccordionTrigger>What is ForensicLedger?</AccordionTrigger>
                <AccordionContent>
                  ForensicLedger is a blockchain-based digital evidence management system that ensures the integrity and chain of custody of forensic evidence through cryptographic verification and decentralized storage. It provides a tamper-proof record of all evidence handling and access.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="blockchain-advantage">
                <AccordionTrigger>What advantages does blockchain provide for evidence management?</AccordionTrigger>
                <AccordionContent>
                  Blockchain technology provides several key advantages for evidence management:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Immutability - Evidence records cannot be altered once recorded</li>
                    <li>Transparency - All actions are visible to authorized parties</li>
                    <li>Cryptographic verification - Evidence integrity can be mathematically verified</li>
                    <li>Decentralization - No single point of failure or manipulation</li>
                    <li>Time-stamping - Precise recording of when evidence was collected and accessed</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="supported-evidence">
                <AccordionTrigger>What types of digital evidence are supported?</AccordionTrigger>
                <AccordionContent>
                  ForensicLedger supports a wide range of digital evidence types, including:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Digital forensic disk images</li>
                    <li>Memory dumps</li>
                    <li>Network packet captures</li>
                    <li>Log files</li>
                    <li>Email archives</li>
                    <li>Mobile device extractions</li>
                    <li>Digital photographs and videos</li>
                    <li>Audio recordings</li>
                    <li>Any other file that can be cryptographically hashed</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Evidence Handling Questions</CardTitle>
            <CardDescription>How to work with evidence in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="submit-evidence">
                <AccordionTrigger>How do I submit evidence?</AccordionTrigger>
                <AccordionContent>
                  To submit evidence:
                  <ol className="list-decimal pl-5 mt-2 space-y-1">
                    <li>Navigate to the Upload page from the main navigation</li>
                    <li>Select the case or FIR you're submitting evidence for</li>
                    <li>Upload your evidence files</li>
                    <li>Fill in the required metadata fields</li>
                    <li>Submit for verification</li>
                  </ol>
                  The system will automatically hash your files and record the submission on the blockchain.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="verify-evidence">
                <AccordionTrigger>How can I verify evidence integrity?</AccordionTrigger>
                <AccordionContent>
                  You can verify evidence integrity in two ways:
                  <ol className="list-decimal pl-5 mt-2 space-y-2">
                    <li>
                      <strong>Upload Verification:</strong> Upload a file to compare its hash with the one recorded on the blockchain.
                    </li>
                    <li>
                      <strong>Chain of Custody View:</strong> Browse existing evidence and view its complete chain of custody history, including all access events and verification results.
                    </li>
                  </ol>
                  Both methods provide cryptographic proof that evidence has not been tampered with since its submission.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="evidence-access">
                <AccordionTrigger>Who can access evidence in the system?</AccordionTrigger>
                <AccordionContent>
                  Evidence access is strictly controlled based on roles and case assignments:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Court administrators have oversight access to all evidence</li>
                    <li>Officers can access evidence for cases they are assigned to</li>
                    <li>Forensic experts can access evidence for technical verification and analysis</li>
                    <li>Lawyers can access evidence for cases where they are legal representatives</li>
                  </ul>
                  All access events are permanently recorded in the evidence chain of custody log.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Role-Specific Questions</CardTitle>
            <CardDescription>Information for specific user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="court-roles">
                <AccordionTrigger>What are the responsibilities of Court administrators?</AccordionTrigger>
                <AccordionContent>
                  Court administrators are responsible for:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>System-wide user management and role assignments</li>
                    <li>Case creation and promotion from FIRs</li>
                    <li>Case status management (sealing, reopening, closing)</li>
                    <li>Emergency system lock controls</li>
                    <li>System-wide oversight and reporting</li>
                    <li>Role assignment for specific cases</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="officer-roles">
                <AccordionTrigger>What can Officers do in the system?</AccordionTrigger>
                <AccordionContent>
                  Officers are primarily responsible for:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Creating and managing First Information Reports (FIRs)</li>
                    <li>Submitting initial evidence</li>
                    <li>Confirming evidence submitted by others</li>
                    <li>Tracking case progress</li>
                    <li>Viewing and accessing evidence for assigned cases</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="forensic-roles">
                <AccordionTrigger>What capabilities do Forensic experts have?</AccordionTrigger>
                <AccordionContent>
                  Forensic experts focus on evidence technical management:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Detailed technical analysis of evidence</li>
                    <li>Advanced metadata extraction and tagging</li>
                    <li>Technical validation of evidence integrity</li>
                    <li>Hash verification and correlation</li>
                    <li>Evidence relationship mapping</li>
                    <li>Chain of custody verification</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="lawyer-roles">
                <AccordionTrigger>What functions are available to Lawyers?</AccordionTrigger>
                <AccordionContent>
                  Lawyers use the system for legal preparation:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Evidence review and annotation for legal relevance</li>
                    <li>Chain of custody verification for legal proceedings</li>
                    <li>Evidence organization and citation for court cases</li>
                    <li>Legal documentation preparation</li>
                    <li>Client case management</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Technical Questions</CardTitle>
            <CardDescription>Information about the technical aspects of the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="blockchain-tech">
                <AccordionTrigger>What blockchain technology is used?</AccordionTrigger>
                <AccordionContent>
                  ForensicLedger is built on Ethereum, utilizing smart contracts for evidence management and access control. The system leverages Ethereum's robust security model while implementing additional layers of cryptographic verification for evidence integrity.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="storage">
                <AccordionTrigger>How is evidence stored in the system?</AccordionTrigger>
                <AccordionContent>
                  Evidence files are stored using a hybrid approach:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Evidence files are stored in a secure, encrypted format</li>
                    <li>Cryptographic hashes of files are recorded on the blockchain</li>
                    <li>Metadata is stored in a structured database with blockchain verification</li>
                    <li>Access controls are enforced through smart contracts</li>
                    <li>For larger files, IPFS (InterPlanetary File System) may be used for distributed storage</li>
                  </ul>
                  This approach balances security, performance, and compliance with legal evidence handling requirements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="wallet-connection">
                <AccordionTrigger>How do I connect my blockchain wallet?</AccordionTrigger>
                <AccordionContent>
                  To connect your wallet:
                  <ol className="list-decimal pl-5 mt-2 space-y-1">
                    <li>Install MetaMask or another compatible Ethereum wallet</li>
                    <li>Navigate to the ForensicLedger login page</li>
                    <li>Click "Connect Wallet"</li>
                    <li>Follow your wallet's prompts to authorize the connection</li>
                    <li>Complete any required identity verification steps</li>
                  </ol>
                  Your wallet address must be pre-authorized in the system by a Court administrator before you can access the platform.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
