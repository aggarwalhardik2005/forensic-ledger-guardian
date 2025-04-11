
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginForm from '@/components/auth/LoginForm';
import { 
  Shield, 
  FileCheck, 
  Lock, 
  Database, 
  Server, 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  ChevronRight,
  Users,
  Scale,
  FileSearch,
  ClipboardCheck,
  Sparkles,
  ArrowDown,
  Hash,
  GitBranch,
  Layers,
  Fingerprint
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const Index = () => {
  // State for animated elements
  const [activeTab, setActiveTab] = useState('law');
  const [isVisible, setIsVisible] = useState({
    features: false,
    howItWorks: false,
    security: false,
    cta: false
  });
  
  // Refs for scroll sections
  const featuresRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const securityRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Handle intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          setIsVisible(prev => ({ ...prev, [targetId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (howItWorksRef.current) observer.observe(howItWorksRef.current);
    if (securityRef.current) observer.observe(securityRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      observer.disconnect();
    };
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forensic-900 to-forensic-800 overflow-x-hidden relative">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 bg-forensic-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-forensic-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-forensic-evidence/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
      
        {/* Blockchain-inspired grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" 
               style={{ 
                 backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                 backgroundSize: '30px 30px'
               }}>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with glass effect */}
        <header className="flex items-center justify-between py-6 backdrop-blur-md bg-forensic-800/30 rounded-xl px-6 mb-8 border border-forensic-700/50">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-forensic-accent to-forensic-evidence rounded-md overflow-hidden group-hover:scale-105 transition-transform">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Forensic<span className="text-forensic-accent">Chain</span>
            </span>
          </div>
          
          {/* Desktop navigation with hover effects */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-forensic-300 hover:text-white transition-colors relative group"
            >
              <span className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span>Features</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forensic-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-forensic-300 hover:text-white transition-colors relative group"
            >
              <span>How It Works</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forensic-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button 
              onClick={() => scrollToSection('security')}
              className="text-forensic-300 hover:text-white transition-colors relative group"
            >
              <span>Security</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forensic-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <Button asChild variant="outline" size="sm" className="border-forensic-accent text-forensic-accent hover:bg-forensic-accent/10 transition-all hover:scale-105">
              <Link to="/dashboard">Access System</Link>
            </Button>
          </nav>
          
          {/* Mobile menu button with animation */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white hover:bg-forensic-accent/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 md:py-16">
          {/* Hero Content with animated text */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="bg-forensic-accent/20 text-forensic-accent inline-flex items-center px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-forensic-accent/30 hover:bg-forensic-accent/30 transition-colors">
                <Lock className="w-4 h-4 mr-1" />
                <span>Blockchain-Powered Security</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                <span className="relative overflow-hidden inline-block animate-fade-in">Digital</span>{' '}
                <span className="relative overflow-hidden inline-block animate-fade-in" style={{ animationDelay: '200ms' }}>Evidence</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-forensic-accent to-forensic-evidence block mt-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
                  Management System
                </span>
              </h1>
              
              <p className="text-lg text-forensic-300 max-w-lg leading-relaxed animate-fade-in" style={{ animationDelay: '600ms' }}>
                Secure, transparent, and tamper-proof digital evidence management for law enforcement and legal professionals.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: '800ms' }}>
              <Button asChild size="lg" className="bg-forensic-accent hover:bg-forensic-accent/90 group transition-transform hover:scale-105">
                <Link to="/dashboard">
                  <span>Access System</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent text-white border-forensic-400 hover:bg-forensic-800/50 transition-transform hover:scale-105"
                onClick={() => scrollToSection('features')}
              >
                <span>Learn More</span>
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
            </div>
            
            <div className="pt-6 border-t border-forensic-700/50 grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: '1000ms' }}>
              <div className="flex items-center space-x-2 p-2 rounded-md bg-forensic-accent/5 backdrop-blur-sm border border-forensic-700/50 hover:bg-forensic-accent/10 transition-colors">
                <CheckCircle className="h-5 w-5 text-forensic-accent flex-shrink-0" />
                <span className="text-forensic-300 text-sm">Tamper-proof Records</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-md bg-forensic-accent/5 backdrop-blur-sm border border-forensic-700/50 hover:bg-forensic-accent/10 transition-colors">
                <CheckCircle className="h-5 w-5 text-forensic-accent flex-shrink-0" />
                <span className="text-forensic-300 text-sm">Immutable Chain-of-Custody</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-md bg-forensic-accent/5 backdrop-blur-sm border border-forensic-700/50 hover:bg-forensic-accent/10 transition-colors">
                <CheckCircle className="h-5 w-5 text-forensic-accent flex-shrink-0" />
                <span className="text-forensic-300 text-sm">Court-Admissible Evidence</span>
              </div>
            </div>
          </div>
          
          {/* Login Form with glass effect */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-forensic-accent/30 rounded-full blur-lg animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-forensic-evidence/30 rounded-full blur-lg animate-pulse" style={{ animationDuration: '7s' }}></div>
                
                {/* Glowing border effect */}
                <div className="p-1 bg-gradient-to-r from-forensic-accent via-forensic-evidence to-forensic-accent rounded-lg animate-pulse" style={{ animationDuration: '4s' }}>
                  <div className="bg-forensic-900 p-6 md:p-8 rounded-lg backdrop-blur-xl shadow-xl border border-forensic-800/50">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Fingerprint className="h-5 w-5 mr-2 text-forensic-accent" />
                      <span>Access the Platform</span>
                    </h2>
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="flex justify-center mt-8 animate-bounce">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => scrollToSection('how-it-works')}
            className="rounded-full p-2 hover:bg-forensic-accent/10 text-forensic-accent"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
        
        {/* How It Works Section with animated timeline */}
        <section 
          id="how-it-works" 
          ref={howItWorksRef}
          className={cn(
            "py-20 scroll-mt-16 transition-all duration-1000 transform",
            isVisible.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 inline-block relative">
              <span className="relative z-10">How It Works</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-forensic-accent/30 -z-0 transform -rotate-1"></span>
            </h2>
            <p className="text-forensic-300 max-w-2xl mx-auto">
              Our blockchain-powered platform streamlines the entire digital evidence lifecycle from collection to courtroom.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Process Step 1 */}
            <div className="relative group">
              <div className="bg-gradient-to-b from-forensic-800/60 to-forensic-800/40 backdrop-blur-sm p-6 rounded-lg border border-forensic-700/50 h-full hover:border-forensic-accent/50 transition-colors hover:shadow-lg hover:shadow-forensic-accent/5">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-forensic-accent to-forensic-evidence rounded-xl flex items-center justify-center font-bold text-white transform group-hover:scale-110 transition-transform">
                  <span className="text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-2 group-hover:text-forensic-accent transition-colors">Evidence Collection</h3>
                <p className="text-forensic-300">
                  Digital evidence is securely collected and uploaded to the platform with cryptographic hashing.
                </p>
              </div>
              
              {/* Fixed arrow positioning for desktop */}
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ChevronRight className="w-8 h-8 text-forensic-accent animate-pulse" />
              </div>
            </div>
            
            {/* Process Step 2 */}
            <div className="relative group">
              <div className="bg-gradient-to-b from-forensic-800/60 to-forensic-800/40 backdrop-blur-sm p-6 rounded-lg border border-forensic-700/50 h-full hover:border-forensic-accent/50 transition-colors hover:shadow-lg hover:shadow-forensic-accent/5">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-forensic-accent to-forensic-evidence rounded-xl flex items-center justify-center font-bold text-white transform group-hover:scale-110 transition-transform">
                  <span className="text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-2 group-hover:text-forensic-accent transition-colors">Blockchain Registration</h3>
                <p className="text-forensic-300">
                  Evidence metadata and hash are recorded on the blockchain, creating an immutable timestamp.
                </p>
              </div>
              
              {/* Fixed arrow positioning for desktop */}
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ChevronRight className="w-8 h-8 text-forensic-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            {/* Process Step 3 */}
            <div className="relative group">
              <div className="bg-gradient-to-b from-forensic-800/60 to-forensic-800/40 backdrop-blur-sm p-6 rounded-lg border border-forensic-700/50 h-full hover:border-forensic-accent/50 transition-colors hover:shadow-lg hover:shadow-forensic-accent/5">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-forensic-accent to-forensic-evidence rounded-xl flex items-center justify-center font-bold text-white transform group-hover:scale-110 transition-transform">
                  <span className="text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-2 group-hover:text-forensic-accent transition-colors">Forensic Analysis</h3>
                <p className="text-forensic-300">
                  Authorized forensic experts analyze evidence with every action transparently recorded.
                </p>
              </div>
              
              {/* Fixed arrow positioning for desktop */}
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ChevronRight className="w-8 h-8 text-forensic-accent animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Process Step 4 */}
            <div className="relative group">
              <div className="bg-gradient-to-b from-forensic-800/60 to-forensic-800/40 backdrop-blur-sm p-6 rounded-lg border border-forensic-700/50 h-full hover:border-forensic-accent/50 transition-colors hover:shadow-lg hover:shadow-forensic-accent/5">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-forensic-accent to-forensic-evidence rounded-xl flex items-center justify-center font-bold text-white transform group-hover:scale-110 transition-transform">
                  <span className="text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-2 group-hover:text-forensic-accent transition-colors">Court Presentation</h3>
                <p className="text-forensic-300">
                  Complete chain-of-custody reports are generated for court, verifiable by all parties.
                </p>
              </div>
            </div>
            
            {/* Mobile step connectors */}
            <div className="lg:hidden flex justify-center col-span-1 md:col-span-2">
              <div className="w-0.5 h-8 bg-gradient-to-b from-forensic-accent to-forensic-evidence"></div>
            </div>
            <div className="lg:hidden flex justify-center col-span-1 md:hidden">
              <div className="w-0.5 h-8 bg-gradient-to-b from-forensic-accent to-forensic-evidence"></div>
            </div>
            <div className="lg:hidden flex justify-center col-span-1 md:col-span-2">
              <div className="w-0.5 h-8 bg-gradient-to-b from-forensic-accent to-forensic-evidence"></div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" className="border-forensic-accent text-forensic-accent hover:bg-forensic-accent/10 transition-all hover:scale-105">
              <Link to="/help">
                <span>Learn more about the process</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Features Section with interactive cards */}
        <section 
          id="features" 
          ref={featuresRef}
          className={cn(
            "py-20 scroll-mt-16 transition-all duration-1000 transform",
            isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 inline-block relative">
              <span className="relative z-10">Key Features</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-forensic-accent/30 -z-0 transform -rotate-1"></span>
            </h2>
            <p className="text-forensic-300 max-w-2xl mx-auto">
              Our blockchain-based system revolutionizes how digital evidence is managed throughout the investigative process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards with hover effects */}
            <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 p-8 rounded-lg border border-forensic-700/50 hover:border-forensic-accent/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-forensic-accent/10 duration-300">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4 group-hover:bg-forensic-accent/20 transition-colors">
                <Shield className="h-6 w-6 text-forensic-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-forensic-accent transition-colors">Immutable Evidence Records</h3>
              <p className="text-forensic-300">
                Once evidence is registered, it cannot be deleted or modified, ensuring complete integrity and authenticity.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 p-8 rounded-lg border border-forensic-700/50 hover:border-forensic-accent/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-forensic-accent/10 duration-300">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4 group-hover:bg-forensic-accent/20 transition-colors">
                <Lock className="h-6 w-6 text-forensic-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-forensic-accent transition-colors">Secure Chain of Custody</h3>
              <p className="text-forensic-300">
                Every interaction with evidence is recorded on the blockchain, creating a transparent and verifiable custody trail.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 p-8 rounded-lg border border-forensic-700/50 hover:border-forensic-accent/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-forensic-accent/10 duration-300">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4 group-hover:bg-forensic-accent/20 transition-colors">
                <Database className="h-6 w-6 text-forensic-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-forensic-accent transition-colors">Decentralized Storage</h3>
              <p className="text-forensic-300">
                Evidence is stored on IPFS, providing resilient and distributed storage that prevents single points of failure.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 p-8 rounded-lg border border-forensic-700/50 hover:border-forensic-accent/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-forensic-accent/10 duration-300">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4 group-hover:bg-forensic-accent/20 transition-colors">
                <FileCheck className="h-6 w-6 text-forensic-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-forensic-accent transition-colors">Cryptographic Verification</h3>
              <p className="text-forensic-300">
                SHA-256 hash verification ensures evidence integrity and allows for easy detection of any tampering attempts.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 p-8 rounded-lg border border-forensic-700/50 hover:border-forensic-accent/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-forensic-accent/10 duration-300">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4 group-hover:bg-forensic-accent/20 transition-colors">
                <Server className="h-6 w-6 text-forensic-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-forensic-accent transition-colors">Role-Based Access</h3>
              <p className="text-forensic-300">
                Granular permissions ensure that only authorized personnel can access, modify, or manage specific cases and evidence.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 p-8 rounded-lg border border-forensic-700/50 hover:border-forensic-accent/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-forensic-accent/10 duration-300">
              <div className="p-3 bg-forensic-accent/10 inline-block rounded-lg mb-4 group-hover:bg-forensic-accent/20 transition-colors">
                <ClipboardCheck className="h-6 w-6 text-forensic-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-forensic-accent transition-colors">Court-Ready Reports</h3>
              <p className="text-forensic-300">
                Generate comprehensive verification reports suitable for court submission with complete custody trail.
              </p>
            </div>
          </div>
        </section>
        
        {/* Role-Based Access Section with tabs */}
        <section 
          id="security" 
          ref={securityRef}
          className={cn(
            "py-20 scroll-mt-16 transition-all duration-1000 transform",
            isVisible.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 inline-block relative">
              <span className="relative z-10">Role-Based Access</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-forensic-accent/30 -z-0 transform -rotate-1"></span>
            </h2>
            <p className="text-forensic-300 max-w-2xl mx-auto">
              Our platform serves the entire judicial ecosystem with specialized interfaces for each role.
            </p>
          </div>
          
          {/* Interactive Tabs for Role Selection */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-10">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-forensic-800/50 border border-forensic-700/50">
              <TabsTrigger 
                value="law" 
                className="data-[state=active]:bg-forensic-accent/20 data-[state=active]:text-white"
              >
                <div className="flex flex-col items-center">
                  <Shield className="h-5 w-5 mb-1" />
                  <span className="text-xs sm:text-sm">Law Enforcement</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="forensic"
                className="data-[state=active]:bg-forensic-accent/20 data-[state=active]:text-white"
              >
                <div className="flex flex-col items-center">
                  <FileSearch className="h-5 w-5 mb-1" />
                  <span className="text-xs sm:text-sm">Forensic</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="legal"
                className="data-[state=active]:bg-forensic-accent/20 data-[state=active]:text-white"
              >
                <div className="flex flex-col items-center">
                  <Scale className="h-5 w-5 mb-1" />
                  <span className="text-xs sm:text-sm">Legal</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="court"
                className="data-[state=active]:bg-forensic-accent/20 data-[state=active]:text-white"
              >
                <div className="flex flex-col items-center">
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-xs sm:text-sm">Court</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            {/* Tab Content for Each Role */}
            <div className="mt-8">
              {/* Law Enforcement Tab */}
              <TabsContent value="law" className="animate-fade-in">
                <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 backdrop-blur-sm p-8 rounded-lg border border-forensic-700/50 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-forensic-accent/10 inline-block rounded-full mr-4">
                      <Shield className="h-6 w-6 text-forensic-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Law Enforcement Officers</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Evidence Collection</h4>
                      <p className="text-forensic-300 text-sm">Securely collect and upload digital evidence with automated hashing.</p>
                    </div>
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Case Management</h4>
                      <p className="text-forensic-300 text-sm">Create and manage cases with intelligent evidence organization.</p>
                    </div>
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Chain of Custody</h4>
                      <p className="text-forensic-300 text-sm">Track every interaction with evidence from collection to courtroom.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Forensic Tab */}
              <TabsContent value="forensic" className="animate-fade-in">
                <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 backdrop-blur-sm p-8 rounded-lg border border-forensic-700/50 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-forensic-accent/10 inline-block rounded-full mr-4">
                      <FileSearch className="h-6 w-6 text-forensic-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Forensic Experts</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Technical Analysis</h4>
                      <p className="text-forensic-300 text-sm">Advanced tools for deep evidence analysis with audit logging.</p>
                    </div>
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Evidence Verification</h4>
                      <p className="text-forensic-300 text-sm">Cryptographic verification of evidence integrity and authenticity.</p>
                    </div>
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Report Generation</h4>
                      <p className="text-forensic-300 text-sm">Create detailed technical reports with blockchain verification.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Legal Tab */}
              <TabsContent value="legal" className="animate-fade-in">
                <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 backdrop-blur-sm p-8 rounded-lg border border-forensic-700/50 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-forensic-accent/10 inline-block rounded-full mr-4">
                      <Scale className="h-6 w-6 text-forensic-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Legal Professionals</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Court Preparation</h4>
                      <p className="text-forensic-300 text-sm">Organize evidence for presentation with timeline visualization.</p>
                    </div>
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Client Management</h4>
                      <p className="text-forensic-300 text-sm">Secure client portals for case status and evidence review.</p>
                    </div>
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Legal Documentation</h4>
                      <p className="text-forensic-300 text-sm">Generate legally sound documentation with evidence citations.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Court Tab */}
              <TabsContent value="court" className="animate-fade-in">
                <div className="bg-gradient-to-br from-forensic-800/50 to-forensic-800/30 backdrop-blur-sm p-8 rounded-lg border border-forensic-700/50 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-forensic-accent/10 inline-block rounded-full mr-4">
                      <Users className="h-6 w-6 text-forensic-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Court Administration</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">User Management</h4>
                      <p className="text-forensic-300 text-sm">Role-based access control for all system participants.</p>
                    </div>
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">System Security</h4>
                      <p className="text-forensic-300 text-sm">Advanced security settings and comprehensive audit logs.</p>
                    </div>
                    <div className="bg-forensic-800/40 p-4 rounded-lg border border-forensic-700/30 hover:border-forensic-accent/30 transition-all">
                      <h4 className="font-medium text-white mb-2">Analytics</h4>
                      <p className="text-forensic-300 text-sm">System-wide reporting and usage analytics dashboards.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="mt-12 text-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-forensic-accent to-forensic-evidence hover:opacity-90 transition-opacity group"
            >
              <Link to="/dashboard">
                <span>Get Started Today</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* CTA Section with animated background */}
        <section 
          id="cta" 
          ref={ctaRef}
          className={cn(
            "py-16 my-8 transition-all duration-1000 transform",
            isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-forensic-accent/20 to-forensic-evidence/20 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full">
                {/* Grid pattern */}
                <div className="absolute inset-0" 
                    style={{ 
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}>
                </div>
                
                {/* Floating elements */}
                <div className="absolute h-20 w-20 rounded-full bg-forensic-accent/10 blur-xl animate-pulse" style={{ top: '20%', left: '10%', animationDuration: '7s' }}></div>
                <div className="absolute h-32 w-32 rounded-full bg-forensic-evidence/10 blur-xl animate-pulse" style={{ bottom: '10%', right: '20%', animationDuration: '11s' }}></div>
                <div className="absolute h-16 w-16 rounded-full bg-white/5 blur-xl animate-pulse" style={{ top: '60%', left: '50%', animationDuration: '9s' }}></div>
                
                {/* Blockchain icons */}
                <Hash className="absolute text-white/5 h-12 w-12" style={{ top: '15%', right: '10%' }} />
                <GitBranch className="absolute text-white/5 h-10 w-10" style={{ bottom: '20%', left: '15%' }} />
                <Layers className="absolute text-white/5 h-8 w-8" style={{ top: '50%', right: '30%' }} />
              </div>
            </div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your evidence management?</h2>
              <p className="text-forensic-300 mb-8">
                Join the growing network of law enforcement agencies, forensic labs, and legal professionals using ForensicChain.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-forensic-900 hover:bg-forensic-100 hover:scale-105 transition-transform">
                  <Link to="/dashboard">
                    <span>Access Platform</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10 hover:scale-105 transition-transform">
                  <Link to="/help">
                    <span>Learn More</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer with modern design */}
        <footer className="py-12 border-t border-forensic-700/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-forensic-accent to-forensic-evidence rounded-md overflow-hidden group-hover:scale-105 transition-transform">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">
                  Forensic<span className="text-forensic-accent">Chain</span>
                </span>
              </div>
              <p className="text-forensic-400 text-sm">
                Blockchain-based digital evidence management for law enforcement and legal professionals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-forensic-400 hover:text-forensic-accent text-sm transition-colors relative group">
                    Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forensic-accent/50 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-forensic-400 hover:text-forensic-accent text-sm transition-colors relative group">
                    Documentation
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forensic-accent/50 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/help/faq" className="text-forensic-400 hover:text-forensic-accent text-sm transition-colors relative group">
                    FAQs
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forensic-accent/50 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-forensic-400 text-sm hover:text-forensic-accent transition-colors">support@forensicchain.com</li>
                <li className="text-forensic-400 text-sm hover:text-forensic-accent transition-colors">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-forensic-800/50 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-forensic-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} ForensicChain. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-forensic-400 hover:text-forensic-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-forensic-400 hover:text-forensic-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-forensic-400 hover:text-forensic-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link to="#" className="text-forensic-400 hover:text-forensic-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;

