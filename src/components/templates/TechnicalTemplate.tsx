import { useResume } from '@/contexts/ResumeContext';
import { Github, Linkedin, Link } from 'lucide-react';

const TechnicalTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, projects, certifications, internships } = resumeData;
  const { primaryColor, fontFamily, showProfileImage } = templateCustomization;

  // Generate dynamic styles
  const accentColor = primaryColor;
  const headerBgStyle = {
    backgroundColor: accentColor,
  };
  
  const sectionTitleStyle = {
    color: accentColor,
    fontFamily
  };

  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[10px] leading-tight" style={{ fontFamily }}>
      {/* Header */}
      <header style={headerBgStyle} className="p-6 text-white">
        <div className="flex items-start">
          {showProfileImage && personalInfo.profileImage && (
            <div className="mr-4">
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.name} 
                className="w-20 h-20 rounded-full object-cover border-2 border-white"
              />
            </div>
          )}
          <div className={showProfileImage && personalInfo.profileImage ? "flex-1" : "w-full"}>
            <h1 className="text-xl font-bold">{personalInfo.name || 'Your Name'}</h1>
            <div className="flex flex-wrap mt-2 text-xs gap-x-4">
              <div className="space-y-0.5">
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
              </div>
              <div className="space-y-0.5">
                {personalInfo.location && <div>{personalInfo.location}</div>}
                <div className="flex items-center gap-4">
                  {personalInfo.github && (
                    <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
                      className="flex items-center gap-1 hover:text-gray-200" target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3" />GitHub
                    </a>
                  )}
                  {personalInfo.linkedin && (
                    <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                      className="flex items-center gap-1 hover:text-gray-200" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-3 w-3" />LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Column */}
        <div className="w-2/5 p-4 pt-6 bg-gray-50">
          {/* Technical Skills - Categorized */}
          <div className="mb-6">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Technical Skills</h2>
            {skills.length > 0 ? (
              <div>
                {/* Group skills by categories (frontend, backend, etc.) */}
                <div className="mb-2">
                  <p className="font-medium text-[9px] uppercase mb-1" style={{color: accentColor}}>Programming Languages</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.filter(s => s.name.toLowerCase().includes('javascript') || 
                                       s.name.toLowerCase().includes('typescript') || 
                                       s.name.toLowerCase().includes('python') || 
                                       s.name.toLowerCase().includes('java') || 
                                       s.name.toLowerCase().includes('c++')).length > 0 ? (
                      skills.filter(s => s.name.toLowerCase().includes('javascript') || 
                                        s.name.toLowerCase().includes('typescript') || 
                                        s.name.toLowerCase().includes('python') || 
                                        s.name.toLowerCase().includes('java') || 
                                        s.name.toLowerCase().includes('c++')).map((skill) => (
                        <span key={skill.id} className="px-1.5 py-0.5 bg-white border rounded text-[9px]">{skill.name}</span>
                      ))
                    ) : (
                      <span className="text-[9px] text-gray-500">Add programming languages to your skills</span>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <p className="font-medium text-[9px] uppercase mb-1" style={{color: accentColor}}>Frontend</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.filter(s => s.name.toLowerCase().includes('react') || 
                                       s.name.toLowerCase().includes('angular') || 
                                       s.name.toLowerCase().includes('vue') || 
                                       s.name.toLowerCase().includes('html') || 
                                       s.name.toLowerCase().includes('css')).length > 0 ? (
                      skills.filter(s => s.name.toLowerCase().includes('react') || 
                                        s.name.toLowerCase().includes('angular') || 
                                        s.name.toLowerCase().includes('vue') || 
                                        s.name.toLowerCase().includes('html') || 
                                        s.name.toLowerCase().includes('css')).map((skill) => (
                        <span key={skill.id} className="px-1.5 py-0.5 bg-white border rounded text-[9px]">{skill.name}</span>
                      ))
                    ) : (
                      <span className="text-[9px] text-gray-500">Add frontend skills</span>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <p className="font-medium text-[9px] uppercase mb-1" style={{color: accentColor}}>Backend</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.filter(s => s.name.toLowerCase().includes('node') || 
                                       s.name.toLowerCase().includes('express') || 
                                       s.name.toLowerCase().includes('django') || 
                                       s.name.toLowerCase().includes('flask') ||
                                       s.name.toLowerCase().includes('api')).length > 0 ? (
                      skills.filter(s => s.name.toLowerCase().includes('node') || 
                                        s.name.toLowerCase().includes('express') || 
                                        s.name.toLowerCase().includes('django') || 
                                        s.name.toLowerCase().includes('flask') ||
                                        s.name.toLowerCase().includes('api')).map((skill) => (
                        <span key={skill.id} className="px-1.5 py-0.5 bg-white border rounded text-[9px]">{skill.name}</span>
                      ))
                    ) : (
                      <span className="text-[9px] text-gray-500">Add backend skills</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[9px] uppercase mb-1" style={{color: accentColor}}>Tools & Other</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.filter(s => !s.name.toLowerCase().includes('javascript') && 
                                       !s.name.toLowerCase().includes('typescript') && 
                                       !s.name.toLowerCase().includes('python') && 
                                       !s.name.toLowerCase().includes('java') && 
                                       !s.name.toLowerCase().includes('c++') &&
                                       !s.name.toLowerCase().includes('react') && 
                                       !s.name.toLowerCase().includes('angular') && 
                                       !s.name.toLowerCase().includes('vue') && 
                                       !s.name.toLowerCase().includes('html') && 
                                       !s.name.toLowerCase().includes('css') &&
                                       !s.name.toLowerCase().includes('node') && 
                                       !s.name.toLowerCase().includes('express') && 
                                       !s.name.toLowerCase().includes('django') && 
                                       !s.name.toLowerCase().includes('flask') &&
                                       !s.name.toLowerCase().includes('api')).length > 0 ? (
                      skills.filter(s => !s.name.toLowerCase().includes('javascript') && 
                                        !s.name.toLowerCase().includes('typescript') && 
                                        !s.name.toLowerCase().includes('python') && 
                                        !s.name.toLowerCase().includes('java') && 
                                        !s.name.toLowerCase().includes('c++') &&
                                        !s.name.toLowerCase().includes('react') && 
                                        !s.name.toLowerCase().includes('angular') && 
                                        !s.name.toLowerCase().includes('vue') && 
                                        !s.name.toLowerCase().includes('html') && 
                                        !s.name.toLowerCase().includes('css') &&
                                        !s.name.toLowerCase().includes('node') && 
                                        !s.name.toLowerCase().includes('express') && 
                                        !s.name.toLowerCase().includes('django') && 
                                        !s.name.toLowerCase().includes('flask') &&
                                        !s.name.toLowerCase().includes('api')).map((skill) => (
                        <span key={skill.id} className="px-1.5 py-0.5 bg-white border rounded text-[9px]">{skill.name}</span>
                      ))
                    ) : (
                      <span className="text-[9px] text-gray-500">Add other technical skills</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 italic">Skills will appear here...</p>
            )}
          </div>
          
          {/* Education */}
          <div className="mb-6">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Education</h2>
            {education.length > 0 ? (
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold">{edu.degree}</p>
                    <p className="italic">{edu.institution}</p>
                    <p className="text-[9px] text-gray-600">{edu.startDate} - {edu.endDate}</p>
                    {edu.description && <p className="text-[9px] mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Education will appear here...</p>
            )}
          </div>
          
          {/* Certifications */}
          {certifications.length > 0 ? (
            <div>
              <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-[9px]">{cert.issuer} | {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Certifications</h2>
              <p className="text-gray-400 italic">Add your certifications...</p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-3/5 p-4 pt-6">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-5">
              <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Professional Summary</h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}
          
          {/* Projects - Technical focus */}
          <div className="mb-5">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-2">Technical Projects</h2>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold">{project.name}</h3>
                      {project.link && (
                        <a 
                          href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[8px] flex items-center gap-0.5"
                          style={{ color: accentColor }}
                        >
                          <Link className="h-2 w-2" /> View Project
                        </a>
                      )}
                    </div>
                    <p className="text-[9px] mt-0.5">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="text-[9px] font-medium" style={{color: accentColor}}>Tech:</span>
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="text-[9px]"
                          >
                            {tech}{index < project.technologies.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Projects will appear here...</p>
            )}
          </div>
          
          {/* Experience */}
          <div className="mb-6">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold pb-1 mb-3">EXPERIENCE</h2>
            <div className="space-y-3">
            {experiences.length > 0 ? (
                experiences.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between">
                      <p className="font-semibold">{exp.title}</p>
                      <p className="text-[8px] text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="italic">{exp.company}, {exp.location}</p>
                    <p className="text-[9px] mt-1">{exp.description}</p>
                  </div>
                ))
            ) : (
              <p className="text-gray-400 italic">Experience will appear here...</p>
            )}
          </div>
          </div>

          {/* Internships */}
          {internships.length > 0 && (
            <div className="mb-6">
              <h2 style={sectionTitleStyle} className="text-sm font-semibold pb-1 mb-3">INTERNSHIPS</h2>
              <div className="space-y-3">
                {internships.map((intern) => (
                  <div key={intern.id} className="mb-3">
                    <div className="flex justify-between">
                      <p className="font-semibold">{intern.title}</p>
                      <p className="text-[8px] text-gray-600">{intern.startDate} - {intern.endDate}</p>
                    </div>
                    <p className="italic">{intern.company}, {intern.location}</p>
                    <p className="text-[9px] mt-1">{intern.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalTemplate;
