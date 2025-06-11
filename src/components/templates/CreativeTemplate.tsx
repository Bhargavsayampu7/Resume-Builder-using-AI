import { useResume } from '@/contexts/ResumeContext';

const CreativeTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, projects, certifications, internships } = resumeData;
  const { primaryColor, fontFamily, showProfileImage } = templateCustomization;

  // Generate dynamic styles
  const sidebarStyle = {
    backgroundColor: `${primaryColor}10`,
    borderRight: `3px solid ${primaryColor}`
  };

  const accentStyle = {
    color: primaryColor
  };

  const sectionTitleStyle = {
    color: primaryColor,
    fontFamily
  };

  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[11px] leading-tight" style={{ fontFamily }}>
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-2/5 p-6" style={sidebarStyle}>
          {/* Profile section */}
          <div className="text-center mb-6">
            {showProfileImage && personalInfo.profileImage && (
              <div className="flex justify-center mb-3">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4" style={{ borderColor: primaryColor }}>
                  <img 
                    src={personalInfo.profileImage} 
                    alt={personalInfo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            <h1 className="text-xl font-bold mb-1" style={accentStyle}>{personalInfo.name || 'Your Name'}</h1>
            
            <div className="space-y-0.5 text-[10px] text-gray-700 mt-3">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
              {personalInfo.github && <div>{personalInfo.github}</div>}
            </div>
          </div>
          
          {/* Skills */}
          <div className="mb-6">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-300">Skills</h2>
            {skills.length > 0 ? (
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="mb-1.5">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      {skill.level && <span className="text-[9px]">{skill.level * 20}%</span>}
                    </div>
                    {skill.level && (
                      <div className="w-full h-1.5 bg-gray-200 rounded-full">
                        <div 
                          className="h-full rounded-full" 
                          style={{
                            width: `${skill.level * 20}%`,
                            backgroundColor: primaryColor
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Skills will appear here...</p>
            )}
          </div>
          
          {/* Languages */}
          <div className="mb-6">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-300">Languages</h2>
            {languages.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex flex-col items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-1 text-white font-bold" 
                      style={{ backgroundColor: primaryColor }}
                    >
                      {language.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[9px] text-center">{language.name}<br/>{language.proficiency}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Languages will appear here...</p>
            )}
          </div>
          
          {/* Education */}
          <div>
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-300">Education</h2>
            {education.length > 0 ? (
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="font-semibold">{edu.degree}</p>
                    <p className="text-[9px]">{edu.institution}, {edu.location}</p>
                    <p className="text-[9px] text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Education will appear here...</p>
            )}
          </div>
        </div>
        
        {/* Right Content Area */}
        <div className="w-3/5 p-6">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-5">
              <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-300">About Me</h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}
          
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
          
          {/* Projects */}
          <div>
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-300">Projects</h2>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <p className="font-semibold">{project.name}</p>
                    <p className="text-[10px] mt-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="inline-block px-1.5 py-0.5 rounded-full text-white text-[8px]"
                            style={{ backgroundColor: primaryColor }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[9px] mt-1 inline-block"
                        style={{ color: primaryColor }}
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Projects will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
