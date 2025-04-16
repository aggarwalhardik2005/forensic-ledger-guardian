
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from '@/components/auth/LoginForm';
import { 
  Shield, 
  FileCheck, 
  Lock, 
  Database, 
  Server, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight,
  Users,
  Scale,
  FileSearch,
  ClipboardCheck,
  Sparkles,
  ExternalLink,
  LockKeyhole,
  Network,
  BarChart3,
  ChevronDown,
  X
} from "lucide-react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Set active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section if hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Function to handle scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-forensic-900/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-gradient-to-r from-forensic-accent to-forensic-evidence rounded-lg flex items-center justify-center overflow-hidden group">
              <Shield className="h-6 w-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzAgMzBsMTUgOC42NnY1LjY3TDMwIDM2LjY3IDE1IDQ0LjMzdi01LjY3TDMwIDMwem0wLTEwbDE1IDguNjZ2NS42N0wzMCAyNi42N2wtMTUgNy42NnYtNS42N0wzMCAyMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjIiLz48L2c+PC9zdmc+')] bg-cover opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">ForensicChain</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className={`text-sm font-medium transition-colors ${activeSection === 'features' ? 'text-forensic-accent' : 'text-white/80 hover:text-white'}`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className={`text-sm font-medium transition-colors ${activeSection === 'how-it-works' ? 'text-forensic-accent' : 'text-white/80 hover:text-white'}`}
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('security')}
              className={`text-sm font-medium transition-colors ${activeSection === 'security' ? 'text-forensic-accent' : 'text-white/80 hover:text-white'}`}
            >
              Security
            </button>
            <Button onClick={toggleModal} variant="outline" size="sm" className="border-forensic-accent text-forensic-accent hover:bg-forensic-accent/10">
              Log In
            </Button>
            <Button asChild size="sm" className="bg-forensic-accent hover:bg-forensic-accent/90">
              <Link to="/dashboard">Access Platform</Link>
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button onClick={toggleModal} variant="outline" size="sm" className="border-forensic-accent text-forensic-accent hover:bg-forensic-accent/10">
              Log In
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={() => document.getElementById('mobile-menu')?.classList.toggle('translate-x-full')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="fixed inset-0 z-40 transform translate-x-full transition-transform duration-300 ease-in-out">
        <div className="absolute inset-0 bg-black/50" onClick={() => document.getElementById('mobile-menu')?.classList.add('translate-x-full')}></div>
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-forensic-900 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-white">Menu</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={() => document.getElementById('mobile-menu')?.classList.add('translate-x-full')}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-6">
            <button 
              onClick={() => {
                scrollToSection('features');
                document.getElementById('mobile-menu')?.classList.add('translate-x-full');
              }}
              className="block w-full text-left py-2 text-white/80 hover:text-white"
            >
              Features
            </button>
            <button 
              onClick={() => {
                scrollToSection('how-it-works');
                document.getElementById('mobile-menu')?.classList.add('translate-x-full');
              }}
              className="block w-full text-left py-2 text-white/80 hover:text-white"
            >
              How It Works
            </button>
            <button 
              onClick={() => {
                scrollToSection('security');
                document.getElementById('mobile-menu')?.classList.add('translate-x-full');
              }}
              className="block w-full text-left py-2 text-white/80 hover:text-white"
            >
              Security
            </button>
            <Button asChild size="sm" className="w-full bg-forensic-accent hover:bg-forensic-accent/90">
              <Link to="/dashboard">Access Platform</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={toggleModal}></div>
            
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block w-full max-w-md p-1 bg-gradient-to-r from-forensic-accent to-forensic-evidence my-8 overflow-hidden align-middle transition-all transform rounded-lg">
              <div className="relative bg-forensic-900 p-6 rounded-lg shadow-xl">
                <button 
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                  onClick={toggleModal}
                >
                  <X className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Access the Platform</h2>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen pt-16 bg-gradient-to-br from-forensic-800 to-forensic-900 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-forensic-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-forensic-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-forensic-evidence/10 rounded-full blur-3xl"></div>
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-4v4h4zm0-8h-4v4h4v-4zm-8 8v-4h-4v4h4zm0-8h-4v4h4v-4zm-8 8v-4h-4v4h4zm0-8h-4v4h4v-4z' stroke='%23666' stroke-opacity='.2' stroke-width='.5'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 md:py-24">
            {/* Hero Content */}
            <div className="space-y-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-forensic-accent/20 to-forensic-evidence/20 border border-forensic-accent/20 backdrop-blur-sm">
                  <LockKeyhole className="w-4 h-4 mr-2 text-forensic-accent" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-forensic-accent to-forensic-evidence">Blockchain-Powered Security</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  Blockchain-Powered 
                  <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-forensic-accent to-forensic-evidence">
                    Digital Evidence Management
                  </span>
                </h1>
                
                <p className="text-lg text-forensic-300 max-w-lg leading-relaxed">
                  Secure, transparent, and tamper-proof evidence for modern investigations, trusted by law enforcement and legal professionals worldwide.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="bg-forensic-accent hover:bg-forensic-accent/90 group">
                  <Link to="/dashboard">
                    <span>Access Platform</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent text-white border-white/20 hover:bg-white/5"
                >
                  Request Demo
                </Button>
              </div>
              
              <div className="pt-6 border-t border-forensic-700 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2 p-2 rounded-md bg-white/5 backdrop-blur-sm">
                  <CheckCircle className="h-5 w-5 text-forensic-accent flex-shrink-0" />
                  <span className="text-forensic-300 text-sm">Tamper-proof Records</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-white/5 backdrop-blur-sm">
                  <CheckCircle className="h-5 w-5 text-forensic-accent flex-shrink-0" />
                  <span className="text-forensic-300 text-sm">Immutable Chain-of-Custody</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-white/5 backdrop-blur-sm">
                  <CheckCircle className="h-5 w-5 text-forensic-accent flex-shrink-0" />
                  <span className="text-forensic-300 text-sm">Court-Admissible Evidence</span>
                </div>
              </div>
            </div>
            
            {/* Login Form */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-md">
                {/* Animated network nodes background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-forensic-accent/20 to-forensic-evidence/20 rounded-lg blur-md animate-pulse-gentle"></div>
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-lg shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzAgMzBsMTUgOC42NnY1LjY3TDMwIDM2LjY3IDE1IDQ0LjMzdi01LjY3TDMwIDMwem0wLTEwbDE1IDguNjZ2NS42N0wzMCAyNi42N2wtMTUgNy42NnYtNS42N0wzMCAyMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] bg-cover opacity-10"></div>
                  
                  {/* 3D blockchain animation placeholder */}
                  <div className="h-64 mb-8 flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      {[0, 1, 2].map((i) => (
                        <div 
                          key={i} 
                          className="absolute inset-0 border-2 border-forensic-accent/50 rounded-xl" 
                          style={{ 
                            transform: `rotateX(${60 + i * 10}deg) rotateZ(${i * 15}deg)`, 
                            animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate` 
                          }}
                        ></div>
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="h-10 w-10 text-forensic-accent" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-2 text-center">Cutting-Edge Security</h2>
                  <p className="text-forensic-300 text-sm text-center mb-4">
                    Every piece of evidence is cryptographically sealed and verified on a distributed ledger
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-forensic-accent">100%</div>
                      <div className="text-xs text-forensic-300 mt-1">Tamper-proof</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-forensic-accent">24/7</div>
                      <div className="text-xs text-forensic-300 mt-1">Access Control</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* How It Works Section */}
          <section id="how-it-works" className="py-20 scroll-mt-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10 mb-4">
                <Network className="w-4 h-4 mr-2 text-forensic-accent" />
                <span className="text-white">Blockchain Workflow</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-forensic-300 max-w-2xl mx-auto">
                Our blockchain-powered platform streamlines the entire digital evidence lifecycle from collection to courtroom.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline connector */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-forensic-accent to-forensic-evidence transform -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/* Process Step 1 */}
                <div className="relative z-10">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 h-full transform transition-transform hover:scale-105 hover:bg-white/10">
                    <div className="relative mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forensic-accent to-forensic-evidence flex items-center justify-center text-white font-bold text-xl">1</div>
                      <div className="hidden lg:block absolute top-1/2 left-12 w-full h-1 bg-gradient-to-r from-forensic-accent to-forensic-evidence transform -translate-y-1/2"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">Evidence Collection</h3>
                    <p className="text-forensic-300">
                      Digital evidence is securely collected and uploaded to the platform with cryptographic hashing and timestamps.
                    </p>
                  </div>
                </div>
                
                {/* Process Step 2 */}
                <div className="relative z-10">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 h-full transform transition-transform hover:scale-105 hover:bg-white/10">
                    <div className="relative mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forensic-accent to-forensic-evidence flex items-center justify-center text-white font-bold text-xl">2</div>
                      <div className="hidden lg:block absolute top-1/2 left-12 w-full h-1 bg-gradient-to-r from-forensic-accent to-forensic-evidence transform -translate-y-1/2"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">Blockchain Registration</h3>
                    <p className="text-forensic-300">
                      Evidence metadata and hash are recorded on the blockchain, creating an immutable timestamp and proof of existence.
                    </p>
                  </div>
                </div>
                
                {/* Process Step 3 */}
                <div className="relative z-10">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 h-full transform transition-transform hover:scale-105 hover:bg-white/10">
                    <div className="relative mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forensic-accent to-forensic-evidence flex items-center justify-center text-white font-bold text-xl">3</div>
                      <div className="hidden lg:block absolute top-1/2 left-12 w-full h-1 bg-gradient-to-r from-forensic-accent to-forensic-evidence transform -translate-y-1/2"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">Forensic Analysis</h3>
                    <p className="text-forensic-300">
                      Authorized forensic experts analyze evidence with every action transparently recorded in the immutable audit trail.
                    </p>
                  </div>
                </div>
                
                {/* Process Step 4 */}
                <div className="relative z-10">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 h-full transform transition-transform hover:scale-105 hover:bg-white/10">
                    <div className="relative mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forensic-accent to-forensic-evidence flex items-center justify-center text-white font-bold text-xl">4</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">Court Presentation</h3>
                    <p className="text-forensic-300">
                      Complete chain-of-custody reports are generated for court, cryptographically verifiable by all authorized parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-12">
              <Button asChild variant="outline" className="border-forensic-accent text-forensic-accent hover:bg-forensic-accent/10">
                <Link to="/help">
                  <span>Learn more about the process</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
          
          {/* Features Section */}
          <section id="features" className="py-20 scroll-mt-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10 mb-4">
                <Sparkles className="w-4 h-4 mr-2 text-forensic-accent" />
                <span className="text-white">Key Capabilities</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Platform Features</h2>
              <p className="text-forensic-300 max-w-2xl mx-auto">
                Our blockchain-based system revolutionizes how digital evidence is managed throughout the investigative process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-forensic-accent/20 to-transparent rounded-bl-3xl"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-forensic-accent/10 flex items-center justify-center mb-6 group-hover:bg-forensic-accent/20 transition-colors">
                    <Shield className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Immutable Evidence Records</h3>
                  <p className="text-forensic-300">
                    Once evidence is registered, it cannot be deleted or modified, ensuring complete integrity and authenticity.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-forensic-accent/20 to-transparent rounded-bl-3xl"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-forensic-accent/10 flex items-center justify-center mb-6 group-hover:bg-forensic-accent/20 transition-colors">
                    <Lock className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Secure Chain of Custody</h3>
                  <p className="text-forensic-300">
                    Every interaction with evidence is recorded on the blockchain, creating a transparent and verifiable custody trail.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-forensic-accent/20 to-transparent rounded-bl-3xl"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-forensic-accent/10 flex items-center justify-center mb-6 group-hover:bg-forensic-accent/20 transition-colors">
                    <Database className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Decentralized Storage</h3>
                  <p className="text-forensic-300">
                    Evidence is stored on IPFS, providing resilient and distributed storage that prevents single points of failure.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-forensic-accent/20 to-transparent rounded-bl-3xl"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-forensic-accent/10 flex items-center justify-center mb-6 group-hover:bg-forensic-accent/20 transition-colors">
                    <FileCheck className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Cryptographic Verification</h3>
                  <p className="text-forensic-300">
                    SHA-256 hash verification ensures evidence integrity and allows for easy detection of any tampering attempts.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-forensic-accent/20 to-transparent rounded-bl-3xl"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-forensic-accent/10 flex items-center justify-center mb-6 group-hover:bg-forensic-accent/20 transition-colors">
                    <Server className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Role-Based Access</h3>
                  <p className="text-forensic-300">
                    Granular permissions ensure that only authorized personnel can access, modify, or manage specific cases and evidence.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-forensic-accent/20 to-transparent rounded-bl-3xl"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-forensic-accent/10 flex items-center justify-center mb-6 group-hover:bg-forensic-accent/20 transition-colors">
                    <ClipboardCheck className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Court-Ready Reports</h3>
                  <p className="text-forensic-300">
                    Generate comprehensive verification reports suitable for court submission with complete custody trail.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Role-Based Access Section */}
          <section id="security" className="py-20 scroll-mt-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10 mb-4">
                <Users className="w-4 h-4 mr-2 text-forensic-accent" />
                <span className="text-white">Role-Based Security</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Built for Every Stakeholder</h2>
              <p className="text-forensic-300 max-w-2xl mx-auto">
                Our platform serves the entire judicial ecosystem with specialized interfaces for each role.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:bg-white/10 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-forensic-accent/10 flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Law Enforcement</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">FIR registration and management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Evidence collection and upload</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Case management and tracking</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:bg-white/10 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-forensic-accent/10 flex items-center justify-center mr-4">
                    <FileSearch className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Forensic Experts</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Evidence analysis and verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Technical report generation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Chain of custody confirmation</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:bg-white/10 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-forensic-accent/10 flex items-center justify-center mr-4">
                    <Scale className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Legal Professionals</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Legal documentation management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Court preparation and evidence review</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Client management and case tracking</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:bg-white/10 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-forensic-accent/10 flex items-center justify-center mr-4">
                    <BarChart3 className="h-6 w-6 text-forensic-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Court Administration</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">User and role management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">System configuration and security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-forensic-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-forensic-300">Audit logs and system reports</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-20">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Trusted by Leading Institutions</h3>
                <p className="text-forensic-400">Law enforcement agencies and legal departments rely on our platform</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="bg-white/5 h-16 rounded-lg flex items-center justify-center">
                  <div className="text-white/30 font-semibold">POLICE DEPT.</div>
                </div>
                <div className="bg-white/5 h-16 rounded-lg flex items-center justify-center">
                  <div className="text-white/30 font-semibold">LEGAL COUNCIL</div>
                </div>
                <div className="bg-white/5 h-16 rounded-lg flex items-center justify-center">
                  <div className="text-white/30 font-semibold">CYBER DIVISION</div>
                </div>
                <div className="bg-white/5 h-16 rounded-lg flex items-center justify-center">
                  <div className="text-white/30 font-semibold">FORENSIC LAB</div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 my-8">
            <div className="bg-gradient-to-r from-forensic-accent/20 to-forensic-evidence/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your evidence management?</h2>
                <p className="text-forensic-300 mb-8">
                  Join the growing network of law enforcement agencies, forensic labs, and legal professionals using ForensicChain.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-forensic-900 hover:bg-white/90 hover:text-forensic-800">
                    <Link to="/dashboard">
                      <span>Access Platform</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">
                    <Link to="/help">
                      <span>Learn More</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="py-12 border-t border-forensic-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-forensic-accent to-forensic-evidence rounded-md overflow-hidden">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-lg text-white">ForensicChain</span>
                </div>
                <p className="text-forensic-400 text-sm">
                  Blockchain-based digital evidence management for law enforcement and legal professionals.
                </p>
              </div>
              
              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-white mb-4">Platform</h4>
                  <ul className="space-y-2">
                    <li><Link to="/dashboard" className="text-forensic-400 hover:text-forensic-accent text-sm">Dashboard</Link></li>
                    <li><Link to="/help" className="text-forensic-400 hover:text-forensic-accent text-sm">Documentation</Link></li>
                    <li><Link to="/help/faq" className="text-forensic-400 hover:text-forensic-accent text-sm">FAQs</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><Link to="#" className="text-forensic-400 hover:text-forensic-accent text-sm">About Us</Link></li>
                    <li><Link to="#" className="text-forensic-400 hover:text-forensic-accent text-sm">Careers</Link></li>
                    <li><Link to="#" className="text-forensic-400 hover:text-forensic-accent text-sm">Privacy Policy</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-4">Contact</h4>
                  <ul className="space-y-2">
                    <li className="text-forensic-400 text-sm">support@forensicchain.com</li>
                    <li className="text-forensic-400 text-sm">+1 (555) 123-4567</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-forensic-800 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-forensic-400 mb-4 md:mb-0">
                © {new Date().getFullYear()} ForensicChain. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <Link to="#" className="text-forensic-400 hover:text-forensic-accent transition-colors" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link to="#" className="text-forensic-400 hover:text-forensic-accent transition-colors" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link to="#" className="text-forensic-400 hover:text-forensic-accent transition-colors" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
