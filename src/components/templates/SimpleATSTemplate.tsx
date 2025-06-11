
import { useResume } from '@/contexts/ResumeContext';
import { Github, Linkedin } from 'lucide-react';

const SimpleATSTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, certifications, languages } = resumeData;
  const { primaryColor, fontFamily } = templateCustomization;

  // Generate dynamic style based on primary color
  const headerStyle = {
    borderBottom: `2px solid ${primaryColor}`,
    color: primaryColor,
    fontFamily
  };

  const sectionTitleStyle = {
    color: primaryColor,
    fontFamily
  };

  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[11px] p-8 leading-tight" style={{ fontFamily }}>
      {/* Header - ATS Friendly with clear contact information */}
      <header className="mb-6 pb-2" style={headerStyle}>
        <h1 className="text-2xl font-bold">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-3 mt-2 text-xs text-gray-700">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          <div className="flex items-center gap-1">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                className="flex items-center gap-1 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-3 w-3" />LinkedIn
              </a>
            )}
          </div>
          <div className="flex items-center gap-1">
            {personalInfo.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
                className="flex items-center gap-1 hover:text-gray-600" target="_blank" rel="noopener noreferrer">
                <Github className="h-3 w-3" />GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Summary - Clear and keyword rich for ATS */}
      {personalInfo.summary && (
        <div className="mb-5">
          <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      
      {/* Skills - Plaintext for ATS scanning */}
      <div className="mb-5">
        <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Skills</h2>
        {skills.length > 0 ? (
          <p className="text-gray-700">
            {skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}{index < skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        ) : (
          <p className="text-gray-400 italic">Skills will appear here...</p>
        )}
      </div>
      
      {/* Experience - Chronological and detailed for ATS */}
      <div className="mb-5">
        <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Professional Experience</h2>
        <div>
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                <p className="font-medium">{exp.company}, {exp.location}</p>
                <p className="mt-1 text-gray-700">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">Experience will appear here...</p>
          )}
        </div>
      </div>
      
      {/* Education - Simple format for ATS */}
      <div className="mb-5">
        <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Education</h2>
        <div>
          {education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                </div>
                <p>{edu.institution}, {edu.location}</p>
                {edu.description && <p className="text-gray-700">{edu.description}</p>}
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">Education will appear here...</p>
          )}
        </div>
      </div>
      
      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Certifications</h2>
          <div>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <h3 className="font-semibold">{cert.name}</h3>
                <p>{cert.issuer} | {cert.date}</p>
                {cert.credentialID && <p className="text-gray-600">Credential ID: {cert.credentialID}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Languages</h2>
          <div>
            {languages.map((language, index) => (
              <span key={language.id}>
                {language.name} ({language.proficiency}){index < languages.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleATSTemplate;
