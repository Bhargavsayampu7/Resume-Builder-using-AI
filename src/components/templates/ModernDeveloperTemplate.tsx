import { useResume } from '@/contexts/ResumeContext';

const ModernDeveloperTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, projects, certifications, internships } = resumeData;
  const { primaryColor, showProfileImage } = templateCustomization;

  // Generate dynamic style based on primary color
  const headerStyle = {
    backgroundColor: primaryColor,
    color: 'white'
  };

  const sectionTitleStyle = {
    borderBottom: `2px solid ${primaryColor}`,
    color: primaryColor
  };

  return (
    <div className="w-full h-full bg-white overflow-hidden text-[10px] leading-tight" style={{
      width: '210mm',
      height: '297mm',
      padding: '0',
      margin: '0'
    }}>
      {/* Header */}
      <header style={headerStyle} className="p-4 flex items-center">
        {showProfileImage && personalInfo.profileImage && (
          <div className="mr-4">
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
            />
          </div>
        )}
        <div className={showProfileImage ? "flex-1" : "w-full"}>
          <h1 className="text-xl font-bold tracking-wide">{personalInfo.name || 'Your Name'}</h1>
          <p className="text-sm opacity-90 mt-1">{personalInfo.summary || 'Professional Summary'}</p>
          <div className="flex flex-wrap gap-x-4 mt-2 text-xs opacity-90">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>
      </header>

      <div className="flex" style={{
        width: '100%'
      }}>
        {/* Left Column */}
        <div className="w-2/5 bg-gray-50 p-4" style={{
          width: '40%'
        }}>
          {/* Skills */}
          <div className="mb-6">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold pb-1 mb-3">Skills</h2>
            <div className="space-y-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div key={skill.id}>
                    <p className="font-medium">{skill.name}</p>
                    {skill.level && (
                      <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
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
                ))
              ) : (
                <p className="text-gray-400 italic">Skills will appear here...</p>
              )}
            </div>
          </div>
          
          {/* Education */}
          <div className="mb-6">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold pb-1 mb-3">EDUCATION</h2>
            <div className="space-y-2">
              {education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="font-medium">{edu.institution}</p>
                    <p>{edu.degree}</p>
                    <p className="text-gray-600 text-[8px]">{edu.startDate} - {edu.endDate}</p>
                    {edu.description && <p className="text-[8px]">{edu.description}</p>}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">Education will appear here...</p>
              )}
            </div>
          </div>
          
          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-6">
              <h2 style={sectionTitleStyle} className="text-sm font-semibold pb-1 mb-3">CERTIFICATIONS</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="font-medium">{cert.name}</p>
                    <p>{cert.issuer}</p>
                    <p className="text-gray-600 text-[8px]">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-3/5 p-4 pt-6">
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
          <div className="mb-6">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold pb-1 mb-3">PROJECTS</h2>
            <div className="space-y-3">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <p className="font-semibold">{project.name}</p>
                    {project.startDate && project.endDate && (
                      <p className="text-[8px] text-gray-600">{project.startDate} - {project.endDate}</p>
                    )}
                    <p className="text-[9px] mt-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-0.5 rounded-full text-[8px]"
                            style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
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
                        className="text-[8px] underline mt-1 block"
                        style={{ color: primaryColor }}
                      >
                        View Project
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">Projects will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDeveloperTemplate;
