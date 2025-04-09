
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Save,
  Calendar,
  MapPin,
  Check,
  User,
  FileQuestion,
  AlertCircle,
  ArrowRight,
  Send
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';

interface FIRManagementProps {
  mode?: 'view' | 'create' | 'edit';
}

const FIRManagement: React.FC<FIRManagementProps> = ({ mode = 'create' }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formCompleted, setFormCompleted] = useState(false);
  
  const titles = {
    view: "FIR Management",
    create: "Create New FIR",
    edit: "Edit FIR"
  };
  
  const descriptions = {
    view: "View and manage your First Information Reports.",
    create: "File a new First Information Report with suspect and witness information.",
    edit: "Update an existing First Information Report."
  };

  const handleCompleteForm = () => {
    // In real implementation, this would validate and submit the form
    setFormCompleted(true);
    setStep(4); // Show success step
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-forensic-800">{titles[mode]}</h1>
          <p className="text-sm text-forensic-600">{descriptions[mode]}</p>
        </div>
        {mode === 'create' && (
          <Badge className="bg-forensic-800 text-white px-3 py-1">
            <FileText className="h-4 w-4 mr-2" />
            New FIR
          </Badge>
        )}
      </div>
      
      {mode === 'create' && (
        <>
          {/* Form Steps Indicator */}
          <div className="flex justify-between mb-6">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-forensic-800' : 'text-forensic-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step > 1 
                  ? 'bg-forensic-success text-white' 
                  : step === 1 
                    ? 'bg-forensic-800 text-white' 
                    : 'bg-forensic-200 text-forensic-400'
              }`}>
                {step > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <span className="text-sm mt-2">Incident Details</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className={`h-1 w-full ${step > 1 ? 'bg-forensic-success' : 'bg-forensic-200'}`}></div>
            </div>
            
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-forensic-800' : 'text-forensic-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step > 2 
                  ? 'bg-forensic-success text-white' 
                  : step === 2 
                    ? 'bg-forensic-800 text-white' 
                    : 'bg-forensic-200 text-forensic-400'
              }`}>
                {step > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
              <span className="text-sm mt-2">Parties Involved</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className={`h-1 w-full ${step > 2 ? 'bg-forensic-success' : 'bg-forensic-200'}`}></div>
            </div>
            
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-forensic-800' : 'text-forensic-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step > 3 
                  ? 'bg-forensic-success text-white' 
                  : step === 3 
                    ? 'bg-forensic-800 text-white' 
                    : 'bg-forensic-200 text-forensic-400'
              }`}>
                {step > 3 ? <Check className="h-5 w-5" /> : 3}
              </div>
              <span className="text-sm mt-2">Review & Submit</span>
            </div>
          </div>
          
          {/* Step 1: Incident Details */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Incident Details</CardTitle>
                <CardDescription>
                  Record the basic details about the incident
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Incident Title</label>
                  <Input placeholder="Enter a descriptive title for the incident" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-forensic-500" />
                      Date of Incident
                    </label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time of Incident</label>
                    <Input type="time" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-forensic-500" />
                    Location of Incident
                  </label>
                  <Input placeholder="Enter the physical location of the incident" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type of Incident</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="data_breach">Data Breach</SelectItem>
                      <SelectItem value="unauthorized_access">Unauthorized System Access</SelectItem>
                      <SelectItem value="information_theft">Information Theft</SelectItem>
                      <SelectItem value="malware_attack">Malware Attack</SelectItem>
                      <SelectItem value="phishing">Phishing Incident</SelectItem>
                      <SelectItem value="identity_theft">Identity Theft</SelectItem>
                      <SelectItem value="data_loss">Data Loss</SelectItem>
                      <SelectItem value="physical">Physical Device Theft</SelectItem>
                      <SelectItem value="other">Other Cyber Crime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Incident Description</label>
                  <Textarea 
                    placeholder="Provide a detailed description of the incident including how it was discovered" 
                    rows={5}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-forensic-100 pt-4">
                <Button 
                  className="bg-forensic-800 hover:bg-forensic-800/90"
                  onClick={() => setStep(2)}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Step 2: Parties Involved */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Parties Involved</CardTitle>
                <CardDescription>
                  Enter information about complainant, suspects, and witnesses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-semibold flex items-center">
                    <User className="h-4 w-4 mr-2 text-forensic-800" />
                    Complainant Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Complainant Name</label>
                      <Input placeholder="Full name of complainant" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Organization</label>
                      <Input placeholder="If representing an organization" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Number</label>
                      <Input placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input type="email" placeholder="Email address" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-semibold flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-forensic-danger" />
                    Suspect Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Suspect Name/Identifier</label>
                      <Input placeholder="Name or identifying information (if known)" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Suspect Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="internal">Internal Actor</SelectItem>
                          <SelectItem value="external">External Actor</SelectItem>
                          <SelectItem value="former_employee">Former Employee</SelectItem>
                          <SelectItem value="group">Organized Group</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Information</label>
                    <Textarea 
                      placeholder="Any other information about the suspect (IP addresses, identifying characteristics, etc.)" 
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-semibold flex items-center">
                    <FileQuestion className="h-4 w-4 mr-2 text-forensic-accent" />
                    Witness Information (if any)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Witness Name</label>
                      <Input placeholder="Full name of witness" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Information</label>
                      <Input placeholder="Phone or email" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Witness Statement</label>
                    <Textarea 
                      placeholder="Brief statement from witness" 
                      rows={3}
                    />
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    + Add Another Witness
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-forensic-100 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                >
                  Previous Step
                </Button>
                <Button 
                  className="bg-forensic-800 hover:bg-forensic-800/90"
                  onClick={() => setStep(3)}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>
                  Review the information before submitting the FIR
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-semibold">Incident Details</h3>
                  <div className="bg-forensic-50 p-4 rounded-md border border-forensic-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-forensic-500">Title</p>
                        <p className="font-medium">Unauthorized Data Access Incident</p>
                      </div>
                      <div>
                        <p className="text-sm text-forensic-500">Date & Time</p>
                        <p className="font-medium">April 9, 2025, 13:45</p>
                      </div>
                      <div>
                        <p className="text-sm text-forensic-500">Location</p>
                        <p className="font-medium">Tech Corp HQ, 123 Main St</p>
                      </div>
                      <div>
                        <p className="text-sm text-forensic-500">Type</p>
                        <p className="font-medium">Unauthorized System Access</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-forensic-500">Description</p>
                      <p className="text-sm">
                        Unauthorized access to the internal database was detected by IT security team.
                        The breach appears to have occurred through compromised login credentials.
                        Several confidential files were accessed during the incident.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-semibold">Complainant</h3>
                  <div className="bg-forensic-50 p-4 rounded-md border border-forensic-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-forensic-500">Name</p>
                        <p className="font-medium">Tech Corp Inc.</p>
                      </div>
                      <div>
                        <p className="text-sm text-forensic-500">Contact</p>
                        <p className="font-medium">security@techcorp.example</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-semibold">Suspect Information</h3>
                  <div className="bg-forensic-50 p-4 rounded-md border border-forensic-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-forensic-500">Suspect</p>
                        <p className="font-medium">Unknown</p>
                      </div>
                      <div>
                        <p className="text-sm text-forensic-500">Type</p>
                        <p className="font-medium">External Actor</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-forensic-500">Additional Information</p>
                      <p className="text-sm">
                        Access originated from IP address 192.168.x.x. Multiple failed login attempts
                        before successful breach.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-forensic-200 rounded-md bg-forensic-50">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-forensic-800" />
                    <h4 className="font-medium">Officer Declaration</h4>
                  </div>
                  <p className="text-sm text-forensic-600 mt-1">
                    I declare that the information provided in this First Information Report is true
                    and accurate to the best of my knowledge.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-forensic-100 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                >
                  Previous Step
                </Button>
                <Button 
                  className="bg-forensic-800 hover:bg-forensic-800/90"
                  onClick={handleCompleteForm}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit FIR
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Step 4: Success */}
          {step === 4 && formCompleted && (
            <Card>
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-forensic-success/20 flex items-center justify-center mb-4">
                  <Check className="h-10 w-10 text-forensic-success" />
                </div>
                <h3 className="text-xl font-bold text-forensic-800 mb-2">FIR Successfully Filed!</h3>
                <p className="text-forensic-600 mb-6 max-w-md">
                  Your First Information Report has been submitted successfully and assigned the ID <strong>FF-2023-120</strong>
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm py-2 border-b border-forensic-100">
                    <span className="text-forensic-500">FIR Number:</span>
                    <span className="font-medium">FF-2023-120</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-forensic-100">
                    <span className="text-forensic-500">Filed By:</span>
                    <span className="font-medium">{user?.name || "Officer Johnson"}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-forensic-100">
                    <span className="text-forensic-500">Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-forensic-500">Status:</span>
                    <Badge className="bg-forensic-warning text-forensic-900">Pending</Badge>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button variant="outline">
                    View FIR Details
                  </Button>
                  <Button className="bg-forensic-evidence hover:bg-forensic-evidence/90">
                    Upload Evidence
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
      
      {/* For view and edit modes, we'd implement different UIs here */}
      {mode === 'view' && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-forensic-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">FIR Management</h2>
          <p className="text-forensic-600">
            View all your filed FIRs and their status
          </p>
        </div>
      )}
      
      {mode === 'edit' && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-forensic-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Edit FIR Form</h2>
          <p className="text-forensic-600">
            Edit an existing FIR with updated information
          </p>
        </div>
      )}
    </div>
  );
};

export default FIRManagement;
