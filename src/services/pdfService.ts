import { PDFShift } from 'pdfshift';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

// Load environment variables
const PDFSHIFT_API_KEY = import.meta.env.VITE_PDFSHIFT_API_KEY;

if (!PDFSHIFT_API_KEY) {
  throw new Error('PDFSHIFT_API_KEY is not set');
}

// Removed global PDFShift instantiation - will be created in constructor

import type { ResumeData } from '@/contexts/ResumeContext';

interface PDFResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    contactItems: Array<{
      icon: string;
      value: string;
    }>;
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

export class PDFService {
  private pdfshift: PDFShift;

  constructor() {
    this.pdfshift = new PDFShift(PDFSHIFT_API_KEY);
  }

  private formatForPDF(data: ResumeData): PDFResumeData {
    const experiences = data.experiences?.map(exp => ({
      company: exp.company,
      position: exp.title,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description
    })) || [];

    const projects = data.projects?.map(proj => ({
      name: proj.name,
      description: proj.description,
      technologies: proj.technologies || [],
      startDate: proj.startDate || '',
      endDate: proj.endDate || ''
    })) || [];

    // Format personal info for contact items
    const contactItems = [
      { icon: '📧', value: data.personalInfo.email },
      { icon: '📞', value: data.personalInfo.phone },
      { icon: '📍', value: data.personalInfo.location },
      { icon: '🔗', value: data.personalInfo.linkedin || '' },
      { icon: '💻', value: data.personalInfo.github || '' }
    ];

    return {
      personalInfo: {
        name: data.personalInfo.name.toUpperCase(),
        title: data.personalInfo.summary,
        email: data.personalInfo.email,
        phone: data.personalInfo.phone,
        location: data.personalInfo.location,
        linkedin: data.personalInfo.linkedin || '',
        github: data.personalInfo.github || '',
        contactItems
      },
      skills: data.skills.map(skill => ({
        name: skill.name,
        level: skill.level || 1
      })),
      experience: experiences,
      projects: projects,
      education: data.education,
      certifications: data.certifications,
      internships: data.internships,
      languages: data.languages
    };
  }

  private async getTemplate(templateType: string = 'standard'): Promise<string> {
    let templateFileName = 'resume-template.html';
    
    // Select template based on type
    switch(templateType) {
      case 'modern':
        templateFileName = 'modern-resume-template.html';
        break;
      case 'standard':
      default:
        templateFileName = 'resume-template.html';
        break;
    }
    
    const templatePath = path.join(process.cwd(), 'src', 'templates', templateFileName);
    return fs.promises.readFile(templatePath, 'utf-8');
  }

  async generatePDF(data: ResumeData, templateType: string = 'standard'): Promise<Buffer> {
    try {
      // Get and compile template
      const template = await this.getTemplate(templateType);
      const compiledTemplate = Handlebars.compile(template);
      
      // Format and render data
      const formattedData = this.formatForPDF(data);
      const html = compiledTemplate(formattedData);

      // Generate PDF
      const result = await this.pdfshift.convert({
        html,
        format: 'A4',
        margins: {
          top: '0cm',
          bottom: '0cm',
          left: '0cm',
          right: '0cm'
        },
        pageSize: {
          width: '210mm',
          height: '297mm'
        }
      });

      return Buffer.from(result);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }
}
