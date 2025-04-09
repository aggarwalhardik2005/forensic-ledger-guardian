
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  FileText, 
  User, 
  UserCog, 
  ShieldAlert,
  ChevronRight,
  FileCheck
} from "lucide-react";

const CreateCase = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">Create Case</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 mr-2 text-forensic-court" />
            Create New Case from FIR
          </CardTitle>
          <CardDescription>
            Promote a First Information Report to a full case
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Basic Details</span>
              </TabsTrigger>
              <TabsTrigger value="parties" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Involved Parties</span>
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                <span>Role Assignments</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border border-forensic-200 rounded-md bg-forensic-50 flex items-start gap-3">
                  <FileText className="h-5 w-5 text-forensic-800 mt-0.5" />
                  <div>
                    <p className="font-medium text-forensic-800">Source FIR: #FF-2023-120</p>
                    <p className="text-sm text-forensic-600">
                      Filed by Officer John Smith on April 9, 2023 at 13:45:22
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caseNumber">Case Number</Label>
                    <Input id="caseNumber" value="FF-2023-120-C" disabled className="bg-forensic-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caseType">Case Type</Label>
                    <Select defaultValue="criminal">
                      <SelectTrigger>
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="criminal">Criminal</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                        <SelectItem value="juvenile">Juvenile</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jurisdiction">Jurisdiction</Label>
                    <Select defaultValue="district">
                      <SelectTrigger>
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="district">District Court</SelectItem>
                        <SelectItem value="highCourt">High Court</SelectItem>
                        <SelectItem value="special">Special Court</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="caseTitle">Case Title</Label>
                  <Input id="caseTitle" placeholder="Enter case title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="caseDescription">Case Description</Label>
                  <Textarea id="caseDescription" placeholder="Enter detailed case description" className="min-h-32" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Next: Involved Parties
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="parties" className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <ShieldAlert className="h-4 w-4 mr-2 text-forensic-court" />
                      Complainant Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="complainantName">Name</Label>
                        <Input id="complainantName" placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complainantContact">Contact</Label>
                        <Input id="complainantContact" placeholder="Phone number" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="complainantAddress">Address</Label>
                      <Textarea id="complainantAddress" placeholder="Full address" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <ShieldAlert className="h-4 w-4 mr-2 text-forensic-warning" />
                      Suspect Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="suspectName">Name</Label>
                        <Input id="suspectName" placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="suspectContact">Contact (if known)</Label>
                        <Input id="suspectContact" placeholder="Phone number" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="suspectAddress">Address (if known)</Label>
                      <Textarea id="suspectAddress" placeholder="Full address" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="suspectDescription">Description</Label>
                      <Textarea id="suspectDescription" placeholder="Physical description and identifying features" />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    Back: Basic Details
                  </Button>
                  <Button className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Next: Role Assignments
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="assignments" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <User className="h-4 w-4 mr-2 text-forensic-800" />
                        Assigned Officers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="leadOfficer">Lead Officer</Label>
                        <Select defaultValue="john.smith">
                          <SelectTrigger>
                            <SelectValue placeholder="Select officer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john.smith">John Smith</SelectItem>
                            <SelectItem value="robert.johnson">Robert Johnson</SelectItem>
                            <SelectItem value="officer3">James Wilson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="assistingOfficers">Assisting Officers</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select officers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="officer1">James Wilson</SelectItem>
                            <SelectItem value="officer2">Maria Garcia</SelectItem>
                            <SelectItem value="officer3">David Lee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <FileCheck className="h-4 w-4 mr-2 text-forensic-accent" />
                        Assigned Forensic Experts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="leadForensic">Lead Forensic Expert</Label>
                        <Select defaultValue="emily.chen">
                          <SelectTrigger>
                            <SelectValue placeholder="Select forensic expert" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emily.chen">Emily Chen</SelectItem>
                            <SelectItem value="david.williams">David Williams</SelectItem>
                            <SelectItem value="forensic3">Thomas Brown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="assistingForensics">Assisting Forensic Experts</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select forensic experts" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="forensic1">Thomas Brown</SelectItem>
                            <SelectItem value="forensic2">Lisa Anderson</SelectItem>
                            <SelectItem value="forensic3">Mark Wilson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="forensicSpecialities">Required Specialities</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialities" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="digital">Digital Forensics</SelectItem>
                            <SelectItem value="dna">DNA Analysis</SelectItem>
                            <SelectItem value="chemical">Chemical Analysis</SelectItem>
                            <SelectItem value="ballistic">Ballistic Examination</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <User className="h-4 w-4 mr-2 text-forensic-warning" />
                      Assigned Legal Representatives
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prosecutor">Prosecution Lead</Label>
                        <Select defaultValue="sarah.lee">
                          <SelectTrigger>
                            <SelectValue placeholder="Select prosecutor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sarah.lee">Sarah Lee</SelectItem>
                            <SelectItem value="jennifer.miller">Jennifer Miller</SelectItem>
                            <SelectItem value="lawyer3">Daniel Martinez</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="defenseAttorney">Defense Attorney (if known)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select defense attorney" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lawyer1">Daniel Martinez</SelectItem>
                            <SelectItem value="lawyer2">Susan Clark</SelectItem>
                            <SelectItem value="lawyer3">Richard Wright</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <User className="h-4 w-4 mr-2 text-forensic-court" />
                      Judicial Assignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="judge">Assigned Judge</Label>
                      <Select defaultValue="michael.wong">
                        <SelectTrigger>
                          <SelectValue placeholder="Select judge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="michael.wong">Michael Wong</SelectItem>
                          <SelectItem value="judge2">Eleanor Rodriguez</SelectItem>
                          <SelectItem value="judge3">William Taylor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    Back: Involved Parties
                  </Button>
                  <Button className="bg-forensic-court hover:bg-forensic-court/90 flex items-center gap-2">
                    <Save className="h-4 w-4 mr-1" />
                    Create Case
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCase;
