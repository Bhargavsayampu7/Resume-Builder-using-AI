import { createContext, useState, useContext, ReactNode } from 'react';

type ExperienceLevel = 'fresher' | 'experienced';
type CareerPath = 'technical' | 'non-technical';
type Industry = 'healthcare' | 'hospitality' | 'food' | 'teaching' | 'other';
type TemplateType = 'modern-developer' | 'technical' | 'business' | 'creative' | 'minimalist' | 'executive' | 'simple-ats' | 'data-scientist' | 'healthcare' | 'hospitality' | 'sales-executive' | 'teaching';
type TemplateLayout = 'single-column' | 'two-column';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  profileImage?: string; // Added for image upload
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

interface Skill {
  id: string;
  name: string;
  level?: number;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialID?: string;
  link?: string;
}

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'intermediate' | 'fluent' | 'native';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  internships: Internship[];
  languages: Language[];
  interests?: string[];
}

interface TemplateCustomization {
  primaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  layout: TemplateLayout;
  showProfileImage: boolean;
}

interface ResumeContextType {
  careerPath: CareerPath | null;
  setCareerPath: (path: CareerPath) => void;
  experienceLevel: ExperienceLevel | null;
  setExperienceLevel: (level: ExperienceLevel) => void;
  industry: Industry | null;
  setIndustry: (industry: Industry) => void;
  selectedTemplate: TemplateType | null;
  setSelectedTemplate: (template: TemplateType) => void;
  templateCustomization: TemplateCustomization;
  updateTemplateCustomization: (customization: Partial<TemplateCustomization>) => void;
  resumeData: ResumeData;
  updateResumeData: (newData: Partial<ResumeData>) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Omit<Experience, "id">) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addCertification: (cert: Omit<Certification, "id">) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addInternship: (internship: Omit<Internship, "id">) => void;
  updateInternship: (id: string, internship: Partial<Internship>) => void;
  removeInternship: (id: string) => void;
  addLanguage: (language: Omit<Language, "id">) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  updateProfileImage: (imageUrl: string) => void;
}

const defaultTemplateCustomization: TemplateCustomization = {
  primaryColor: '#6D28D9', // Default primary color
  fontFamily: 'Poppins',
  fontSize: 'medium',
  layout: 'single-column',
  showProfileImage: false,
};

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  internships: [],
  languages: []
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [templateCustomization, setTemplateCustomization] = useState<TemplateCustomization>(defaultTemplateCustomization);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  // Generate a unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Update template customization
  const updateTemplateCustomization = (customization: Partial<TemplateCustomization>) => {
    setTemplateCustomization(prev => ({ ...prev, ...customization }));
  };

  // Update entire resume data
  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  // Update personal info
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  // Update profile image
  const updateProfileImage = (imageUrl: string) => {
    updatePersonalInfo({ profileImage: imageUrl });
  };

  // Experience methods
  const addExperience = (exp: Omit<Experience, "id">) => {
    const newExperience = { ...exp, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(item => 
        item.id === id ? { ...item, ...exp } : item
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(item => item.id !== id)
    }));
  };

  // Education methods
  const addEducation = (edu: Omit<Education, "id">) => {
    const newEducation = { ...edu, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === id ? { ...item, ...edu } : item
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  // Skill methods
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = { ...skill, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(item => 
        item.id === id ? { ...item, ...skill } : item
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }));
  };

  // Project methods
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(item => 
        item.id === id ? { ...item, ...project } : item
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  // Certification methods
  const addCertification = (cert: Omit<Certification, "id">) => {
    const newCertification = { ...cert, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
  };

  const updateCertification = (id: string, cert: Partial<Certification>) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(item => 
        item.id === id ? { ...item, ...cert } : item
      )
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(item => item.id !== id)
    }));
  };

  // Internship methods
  const addInternship = (internship: Omit<Internship, "id">) => {
    const newInternship = { ...internship, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      internships: [...prev.internships, newInternship]
    }));
  };

  const updateInternship = (id: string, internship: Partial<Internship>) => {
    setResumeData(prev => ({
      ...prev,
      internships: prev.internships.map(item => 
        item.id === id ? { ...item, ...internship } : item
      )
    }));
  };

  const removeInternship = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      internships: prev.internships.filter(item => item.id !== id)
    }));
  };

  // Language methods
  const addLanguage = (language: Omit<Language, "id">) => {
    const newLanguage = { ...language, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
  };

  const updateLanguage = (id: string, language: Partial<Language>) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(item => 
        item.id === id ? { ...item, ...language } : item
      )
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(item => item.id !== id)
    }));
  };

  return (
    <ResumeContext.Provider value={{
      careerPath,
      setCareerPath,
      experienceLevel,
      setExperienceLevel,
      industry,
      setIndustry,
      selectedTemplate,
      setSelectedTemplate,
      templateCustomization,
      updateTemplateCustomization,
      resumeData,
      updateResumeData,
      updatePersonalInfo,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addSkill,
      updateSkill,
      removeSkill,
      addProject,
      updateProject,
      removeProject,
      addCertification,
      updateCertification,
      removeCertification,
      addInternship,
      updateInternship,
      removeInternship,
      addLanguage,
      updateLanguage,
      removeLanguage,
      updateProfileImage
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
