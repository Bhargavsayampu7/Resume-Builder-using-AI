import { useEffect } from 'react';
import { PDFGenerator } from './PDFGenerator';
import { sampleResumeData } from '../../components/pdf-resume/sampleResumeData';
import type { SampleResumeData } from '../../components/pdf-resume/sampleResumeData';
import { useResume } from '@/contexts/ResumeContext';
import type { ResumeData } from '@/contexts/ResumeContext';
import { v4 as uuidv4 } from 'uuid';

// Convert sample data to match context types
const convertToContextData = (data: SampleResumeData): Partial<ResumeData> => ({
  personalInfo: {
    ...data.personalInfo,
    summary: 'Summary will be added here'
  },
  experiences: data.experiences.map(exp => ({
    id: exp.id,
    title: exp.title,
    company: exp.company,
    location: exp.location,
    startDate: exp.startDate,
    endDate: exp.endDate,
    current: exp.current,
    description: exp.description
  })),
  education: data.education.map(edu => ({
    id: edu.id,
    degree: edu.degree,
    institution: edu.institution,
    location: edu.location,
    startDate: edu.startDate,
    endDate: edu.endDate,
    description: edu.description
  })),
  skills: data.skills.map(skill => ({
    id: skill.id,
    name: skill.name,
    level: skill.level
  })),
  projects: data.projects.map(proj => ({
    id: proj.id,
    name: proj.name,
    description: proj.description,
    technologies: proj.technologies,
    startDate: proj.startDate,
    endDate: proj.endDate
  })),
  certifications: data.certifications.map(cert => ({
    id: cert.id,
    name: cert.name,
    issuer: cert.issuer,
    date: cert.date,
    expiryDate: cert.expiryDate,
    credentialID: cert.credentialID,
    link: cert.link
  })),
  internships: data.internships.map(intern => ({
    id: intern.id,
    title: intern.title,
    company: intern.company,
    location: intern.location,
    startDate: intern.startDate,
    endDate: intern.endDate,
    description: intern.description
  })),
  languages: data.languages.map(lang => ({
    id: lang.id,
    name: lang.name,
    proficiency: lang.proficiency
  }))
});

export const PDFTest = () => {
  const { updateResumeData } = useResume();

  useEffect(() => {
    // Convert and set sample resume data
    const contextData = convertToContextData(sampleResumeData);
    updateResumeData(contextData);
  }, [updateResumeData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Resume Generator Test</h1>
      <div className="max-w-2xl w-full">
        <PDFGenerator />
      </div>
    </div>
  );
};
