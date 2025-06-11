import { useResume } from '@/contexts/ResumeContext';

const MinimalistTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, languages, projects, certifications, internships } = resumeData;
  const { primaryColor, fontFamily } = templateCustomization;

  // Generate dynamic style based on primary color and font
  const nameStyle = {
    color: primaryColor,
    fontFamily: fontFamily
  };

  const sectionTitleStyle = {
    color: primaryColor,
    borderLeft: `3px solid ${primaryColor}`,
    paddingLeft: '10px',
    fontFamily: fontFamily
  };

  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[11px] leading-tight p-8" style={{ fontFamily }}>
      {/* Header - Very minimal with just name and contact in a clean line */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-wide mb-2" style={nameStyle}>{personalInfo.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-3 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary - Clean and concise */}
      {personalInfo.summary && (
        <div className="mb-6">
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
      
      {/* Education - Simple and clean */}
      <div className="mb-5">
        <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3">Education</h2>
        <div className="space-y-2">
          {education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-500 text-[9px]">{edu.startDate} - {edu.endDate}</p>
                </div>
                <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                {edu.description && <p className="mt-1 text-gray-700 text-[10px]">{edu.description}</p>}
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">Education will appear here...</p>
          )}
        </div>
      </div>
      
      {/* Projects - Simple with clear separation */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="mb-2">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="mt-1 text-gray-700 text-[10px]">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="inline-block px-1 py-0.5 text-[8px] border border-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills and Languages in two columns */}
      <div className="flex gap-6">
        <div className="w-1/2">
          <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3">Skills</h2>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="inline-block px-2 py-1 text-[9px] bg-gray-100 rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">Skills will appear here...</p>
          )}
        </div>
        
        <div className="w-1/2">
          <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase mb-3">Languages</h2>
          {languages.length > 0 ? (
            <ul className="space-y-1">
              {languages.map((language) => (
                <li key={language.id} className="flex justify-between">
                  <span>{language.name}</span>
                  <span className="text-gray-500">{language.proficiency}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">Languages will appear here...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
