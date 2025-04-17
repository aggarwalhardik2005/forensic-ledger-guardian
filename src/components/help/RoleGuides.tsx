
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, HelpCircle, BarChart3, FileDigit, Shield, Calendar, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/services/web3Service';

interface GuideLink {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

interface RoleGuidesProps {
  role?: Role;
}

const RoleGuides: React.FC<RoleGuidesProps> = ({ role }) => {
  const { user } = useAuth();
  const activeRole = role || (user ? user.role : Role.None);

  const courtGuides: GuideLink[] = [
    {
      id: 'case-management',
      title: 'Case Management',
      description: 'Learn how to efficiently manage case states and transitions',
      icon: <FileText className="h-5 w-5 text-forensic-court" />,
      path: '/help/court/case-management'
    },
    {
      id: 'role-permissions',
      title: 'Role Management',
      description: 'Understanding the permission hierarchy and user roles',
      icon: <User className="h-5 w-5 text-forensic-court" />,
      path: '/help/court/permissions'
    },
    {
      id: 'security',
      title: 'System Security',
      description: 'Best practices for maintaining system security',
      icon: <Shield className="h-5 w-5 text-forensic-court" />,
      path: '/help/court/security'
    }
  ];

  const officerGuides: GuideLink[] = [
    {
      id: 'fir-creation',
      title: 'FIR Management',
      description: 'Creating and managing First Information Reports',
      icon: <FileText className="h-5 w-5 text-forensic-accent" />,
      path: '/help/officer/fir-creation'
    },
    {
      id: 'evidence-handling',
      title: 'Evidence Handling',
      description: 'Guidelines for digital evidence collection and submission',
      icon: <FileDigit className="h-5 w-5 text-forensic-accent" />,
      path: '/help/officer/evidence-handling'
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      description: 'Generating and interpreting case reports',
      icon: <BarChart3 className="h-5 w-5 text-forensic-accent" />,
      path: '/help/officer/reports'
    }
  ];

  const forensicGuides: GuideLink[] = [
    {
      id: 'analysis',
      title: 'Forensic Analysis',
      description: 'Digital forensics techniques and best practices',
      icon: <FileDigit className="h-5 w-5 text-forensic-evidence" />,
      path: '/help/forensic/analysis'
    },
    {
      id: 'blockchain',
      title: 'Blockchain Verification',
      description: 'Using blockchain for evidence integrity verification',
      icon: <Shield className="h-5 w-5 text-forensic-evidence" />,
      path: '/help/forensic/blockchain'
    },
    {
      id: 'custody',
      title: 'Chain of Custody',
      description: 'Maintaining proper evidence custody records',
      icon: <Calendar className="h-5 w-5 text-forensic-evidence" />,
      path: '/help/custody'
    }
  ];

  const lawyerGuides: GuideLink[] = [
    {
      id: 'court-prep',
      title: 'Court Preparation',
      description: 'Preparing digital evidence for court proceedings',
      icon: <FileDigit className="h-5 w-5 text-forensic-warning" />,
      path: '/help/lawyer/court-prep'
    },
    {
      id: 'chain-verification',
      title: 'Evidence Verification',
      description: 'Verifying evidence integrity and authenticity',
      icon: <Shield className="h-5 w-5 text-forensic-warning" />,
      path: '/help/lawyer/verification'
    },
    {
      id: 'client-management',
      title: 'Client Management',
      description: 'Managing client access to case information',
      icon: <User className="h-5 w-5 text-forensic-warning" />,
      path: '/help/lawyer/clients'
    }
  ];

  const commonGuides: GuideLink[] = [
    {
      id: 'verification',
      title: 'Evidence Verification',
      description: 'How to verify evidence using blockchain technology',
      icon: <Shield className="h-5 w-5 text-forensic-500" />,
      path: '/help/verification'
    },
    {
      id: 'chain-of-custody',
      title: 'Chain of Custody',
      description: 'Understanding the digital chain of custody',
      icon: <Calendar className="h-5 w-5 text-forensic-500" />,
      path: '/help/chain-of-custody'
    }
  ];

  const getRoleGuides = () => {
    switch(activeRole) {
      case Role.Court:
        return courtGuides;
      case Role.Officer:
        return officerGuides;
      case Role.Forensic:
        return forensicGuides;
      case Role.Lawyer:
        return lawyerGuides;
      default:
        return [];
    }
  };

  const getRoleTitle = () => {
    switch(activeRole) {
      case Role.Court:
        return "Court";
      case Role.Officer:
        return "Officer";
      case Role.Forensic:
        return "Forensic";
      case Role.Lawyer:
        return "Lawyer";
      default:
        return "User";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border border-forensic-200">
        <CardHeader className="bg-gradient-to-r from-forensic-50 to-transparent">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-forensic-600" />
            {getRoleTitle()} Role Documentation
          </CardTitle>
          <CardDescription>
            Role-specific guides and best practices
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getRoleGuides().map(guide => (
            <div key={guide.id} className="border rounded-lg p-4 hover:border-forensic-400 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                {guide.icon}
                <h3 className="font-medium">{guide.title}</h3>
              </div>
              <p className="text-sm text-forensic-600 mb-3">{guide.description}</p>
              <Button variant="link" asChild className="px-0">
                <Link to={guide.path}>Read Guide</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-forensic-200">
        <CardHeader className="bg-gradient-to-r from-forensic-50 to-transparent">
          <CardTitle className="text-lg flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-forensic-600" />
            Common Documentation
          </CardTitle>
          <CardDescription>
            General guides for all system users
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {commonGuides.map(guide => (
            <div key={guide.id} className="border rounded-lg p-4 hover:border-forensic-400 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                {guide.icon}
                <h3 className="font-medium">{guide.title}</h3>
              </div>
              <p className="text-sm text-forensic-600 mb-3">{guide.description}</p>
              <Button variant="link" asChild className="px-0">
                <Link to={guide.path}>Read Guide</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleGuides;
