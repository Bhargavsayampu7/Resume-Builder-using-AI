import { useResume } from '@/contexts/ResumeContext';
import { Progress } from "@/components/ui/progress";
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const DataScientistTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, languages, certifications, projects } = resumeData;
  const { primaryColor, fontFamily, showProfileImage } = templateCustomization;

  // Generate dynamic styles
  const accentColor = primaryColor || '#4FB3D9';
  const sidebarColor = '#2A4356';
  
  const headerStyle = {
    backgroundColor: 'white',
    color: '#333'
  };

  const sidebarStyle = {
    backgroundColor: sidebarColor,
    color: 'white'
  };

  const accentStyle = {
    color: accentColor
  };

  const progressBarStyle = {
    backgroundColor: accentColor
  };

  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[10px] leading-tight flex" style={{ fontFamily }}>
      {/* Left Sidebar */}
      <div className="w-1/3 p-6" style={sidebarStyle}>
        {/* Profile Image and Contact */}
        <div className="text-center mb-6">
          {showProfileImage && personalInfo.profileImage && (
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
                <img 
                  src={personalInfo.profileImage} 
                  alt={personalInfo.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2 mt-4">
            <h3 className="uppercase font-bold text-sm mb-2">Contact Details</h3>
            
            {personalInfo.email && (
              <div className="flex items-center gap-2 text-[9px]">
                <Mail className="h-3 w-3" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center gap-2 text-[9px]">
                <Phone className="h-3 w-3" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center gap-2 text-[9px]">
                <MapPin className="h-3 w-3" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2 text-[9px]">
                <Linkedin className="h-3 w-3" />
                <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                   target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/{personalInfo.linkedin.split('/').pop()}
                </a>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center gap-2 text-[9px]">
                <Github className="h-3 w-3" />
                <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
                   target="_blank" rel="noopener noreferrer">
                  {personalInfo.github.split('/').pop()}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills */}
        <div className="mb-6">
          <h3 className="uppercase font-bold text-sm mb-2">Skills</h3>
          
          {skills.length > 0 ? (
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="mb-1">
                  <p className="text-[9px] font-medium mb-1">{skill.name}</p>
                  {skill.level && (
                    <Progress 
                      value={skill.level * 20} 
                      className="h-1.5 bg-white/20" 
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[9px] opacity-70 italic">Skills will appear here...</p>
          )}
        </div>
        
        {/* Education */}
        <div className="mb-6">
          <h3 className="uppercase font-bold text-sm mb-2">Education</h3>
          
          {education.length > 0 ? (
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-semibold text-[9px]">{edu.degree}</p>
                  <p className="text-[9px]">{edu.institution}</p>
                  <p className="text-[8px] opacity-80">{edu.startDate} - {edu.endDate}</p>
                  {edu.description && (
                    <p className="text-[8px] mt-1 opacity-80">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[9px] opacity-70 italic">Education will appear here...</p>
          )}
        </div>
        
        {/* Languages */}
        <div className="mb-6">
          <h3 className="uppercase font-bold text-sm mb-2">Languages</h3>
          
          {languages.length > 0 ? (
            <div className="space-y-1">
              {languages.map((language) => (
                <div key={language.id} className="flex justify-between items-center">
                  <span className="text-[9px]">{language.name}</span>
                  <span className="text-[8px] opacity-80">{language.proficiency}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[9px] opacity-70 italic">Languages will appear here...</p>
          )}
        </div>
        
        {/* Certifications */}
        <div>
          <h3 className="uppercase font-bold text-sm mb-2">Certifications</h3>
          
          {certifications.length > 0 ? (
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-1">
                  <p className="font-medium text-[9px]">{cert.name}</p>
                  <p className="text-[8px] opacity-80">{cert.issuer}, {cert.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[9px] opacity-70 italic">Certifications will appear here...</p>
          )}
        </div>
      </div>
      
      {/* Right Content Area */}
      <div className="w-2/3 p-6 bg-white text-gray-800">
        {/* Header */}
        <header className="mb-6" style={headerStyle}>
          <h1 className="text-2xl font-bold" style={accentStyle}>{personalInfo.name || 'Your Name'}</h1>
          <p className="text-sm font-medium text-gray-700">Data Scientist</p>
          
          {personalInfo.summary && (
            <div className="mt-2 text-[9px] text-gray-600">
              {personalInfo.summary}
            </div>
          )}
        </header>
        
        {/* Work Experience */}
        <div className="mb-6">
          <h2 style={accentStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Work Experience</h2>
          
          {experiences.length > 0 ? (
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-[11px]">{exp.title}</h3>
                    <span className="text-[9px] text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-700">{exp.company}, {exp.location}</p>
                  <p className="text-[9px] mt-1 text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-[9px]">Experience will appear here...</p>
          )}
        </div>
        
        {/* Projects */}
        <div className="mb-6">
          <h2 style={accentStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Projects</h2>
          
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-[11px]">{project.name}</h3>
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[8px]"
                        style={accentStyle}
                      >
                        Project Link
                      </a>
                    )}
                  </div>
                  <p className="text-[9px] mt-1 text-gray-600">{project.description}</p>
                  
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="inline-block px-1.5 py-0.5 text-white text-[7px] rounded"
                          style={{ backgroundColor: accentColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-[9px]">Projects will appear here...</p>
          )}
        </div>
        
        {/* Achievements and Interests */}
        <div>
          <h2 style={accentStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Interests</h2>
          
          <div className="flex flex-wrap gap-2">
            <span className="inline-block px-2 py-1 text-[8px] rounded bg-gray-100">Artificial Intelligence</span>
            <span className="inline-block px-2 py-1 text-[8px] rounded bg-gray-100">Machine Learning</span>
            <span className="inline-block px-2 py-1 text-[8px] rounded bg-gray-100">Data Visualization</span>
            <span className="inline-block px-2 py-1 text-[8px] rounded bg-gray-100">Big Data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataScientistTemplate;
