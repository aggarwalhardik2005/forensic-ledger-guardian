
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginForm from '@/components/auth/LoginForm';
import { Shield, FileCheck, Lock, Database, Server } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forensic-800 to-forensic-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-forensic-accent" />
            <span className="font-bold text-xl text-white">ForensicLedger</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="#features" className="text-forensic-300 hover:text-white transition-colors">Features</Link>
            <Link to="#how-it-works" className="text-forensic-300 hover:text-white transition-colors">How It Works</Link>
            <Link to="#security" className="text-forensic-300 hover:text-white transition-colors">Security</Link>
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
          {/* Hero Content */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Blockchain-Based Digital Forensics Evidence Management
              </h1>
              <p className="text-lg text-forensic-300 max-w-lg">
                Secure, transparent, and tamper-proof digital evidence management for law enforcement and legal professionals.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="bg-forensic-accent hover:bg-forensic-accent/90">
                <Link to="/dashboard">
                  <Lock className="mr-2 h-4 w-4" />
                  Access System
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-forensic-400 hover:bg-forensic-800">
                <Link to="#learn-more">
                  Learn More
                </Link>
              </Button>
            </div>
            
            <div className="pt-6 border-t border-forensic-700">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-forensic-accent" />
                  <span className="text-forensic-300">Tamper-proof Records</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-forensic-accent" />
                  <span className="text-forensic-300">Immutable Chain-of-Custody</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-forensic-accent" />
                  <span className="text-forensic-300">Court-Admissible</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Login Form */}
          <div className="flex justify-center items-center">
            <LoginForm />
          </div>
        </div>
        
        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-forensic-300 max-w-2xl mx-auto">
              Our blockchain-based system revolutionizes how digital evidence is managed throughout the investigative process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-forensic-800/50 p-6 rounded-lg border border-forensic-700 hover:border-forensic-accent transition-colors">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4">
                <Shield className="h-6 w-6 text-forensic-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Immutable Evidence Records</h3>
              <p className="text-forensic-300">
                Once evidence is registered, it cannot be deleted or modified, ensuring complete integrity and authenticity.
              </p>
            </div>
            
            <div className="bg-forensic-800/50 p-6 rounded-lg border border-forensic-700 hover:border-forensic-accent transition-colors">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4">
                <Lock className="h-6 w-6 text-forensic-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Chain of Custody</h3>
              <p className="text-forensic-300">
                Every interaction with evidence is recorded on the blockchain, creating a transparent and verifiable custody trail.
              </p>
            </div>
            
            <div className="bg-forensic-800/50 p-6 rounded-lg border border-forensic-700 hover:border-forensic-accent transition-colors">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4">
                <Database className="h-6 w-6 text-forensic-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Decentralized Storage</h3>
              <p className="text-forensic-300">
                Evidence is stored on IPFS, providing resilient and distributed storage that prevents single points of failure.
              </p>
            </div>
            
            <div className="bg-forensic-800/50 p-6 rounded-lg border border-forensic-700 hover:border-forensic-accent transition-colors">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4">
                <FileCheck className="h-6 w-6 text-forensic-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cryptographic Verification</h3>
              <p className="text-forensic-300">
                SHA-256 hash verification ensures evidence integrity and allows for easy detection of any tampering attempts.
              </p>
            </div>
            
            <div className="bg-forensic-800/50 p-6 rounded-lg border border-forensic-700 hover:border-forensic-accent transition-colors">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4">
                <Server className="h-6 w-6 text-forensic-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Role-Based Access</h3>
              <p className="text-forensic-300">
                Granular permissions ensure that only authorized personnel can access, modify, or manage specific cases and evidence.
              </p>
            </div>
            
            <div className="bg-forensic-800/50 p-6 rounded-lg border border-forensic-700 hover:border-forensic-accent transition-colors">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4">
                <FileCheck className="h-6 w-6 text-forensic-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Court-Ready Reports</h3>
              <p className="text-forensic-300">
                Generate comprehensive verification reports suitable for court submission with complete custody trail.
              </p>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 border-t border-forensic-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-forensic-accent" />
              <span className="font-bold text-lg text-white">ForensicLedger</span>
            </div>
            <div className="text-sm text-forensic-400">
              © {new Date().getFullYear()} ForensicLedger. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
