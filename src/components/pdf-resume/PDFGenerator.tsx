import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { PDFService } from '@/services/pdfService';
import { useResume } from '@/contexts/ResumeContext';
import type { ResumeData } from '@/contexts/ResumeContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PDFResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  skills: Array<{
    name: string;
    level: number;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialID?: string;
    link?: string;
  }>;
  internships: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: 'basic' | 'intermediate' | 'fluent' | 'native';
  }>;
}

export const PDFGenerator = () => {
  const { resumeData } = useResume();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [templateType, setTemplateType] = useState('standard');
  const pdfService = new PDFService();

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      
      // Format data for PDF generation
      const pdfBuffer = await pdfService.generatePDF(resumeData, templateType);
      
      // Create download link
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: 'Success',
        description: 'Resume PDF has been downloaded successfully'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-xs">
        <label className="block text-sm font-medium mb-2">Select Resume Template</label>
        <Select
          value={templateType}
          onValueChange={setTemplateType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard Resume</SelectItem>
            <SelectItem value="modern">Modern Resume</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        onClick={handleDownloadPDF}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        Download PDF
      </Button>
      <div className="text-sm text-muted-foreground">
        Download your resume as a PDF file
      </div>
    </div>
  );
};
