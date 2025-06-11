import { useResume } from '@/contexts/ResumeContext';

const ExecutiveTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, languages, certifications, internships } = resumeData;
  const { primaryColor, fontFamily, showProfileImage } = templateCustomization;

  // Generate dynamic styles
  const headerStyle = {
    borderBottom: `3px solid ${primaryColor}`,
  };

  const nameStyle = {
    color: primaryColor,
    fontFamily: fontFamily
  };

  const sectionTitleStyle = {
    color: primaryColor,
    fontFamily: fontFamily
  };

  const sectionDividerStyle = {
    backgroundColor: primaryColor
  };

  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[11px] leading-tight" style={{ fontFamily }}>
      {/* Header with name and contact info */}
      <header className="p-7 pb-5" style={headerStyle}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-wide" style={nameStyle}>{personalInfo.name || 'Your Name'}</h1>
            <p className="text-sm mt-1 text-gray-600">{personalInfo.summary ? personalInfo.summary.substring(0, 100) + (personalInfo.summary.length > 100 ? '...' : '') : 'Professional Summary'}</p>
          </div>
          
          {showProfileImage && personalInfo.profileImage && (
            <div className="ml-4">
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.name} 
                className="w-20 h-20 object-cover border-2"
                style={{ borderColor: primaryColor }}
              />
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-between mt-3 text-xs text-gray-600">
          <div className="space-y-1">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
          </div>
          <div className="space-y-1">
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          </div>
        </div>
      </header>

      <div className="p-7 pt-4">
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
        
        {/* Education and Certifications side by side */}
        <div className="flex gap-6 mb-5">
          <div className="w-1/2">
            <h2 style={sectionTitleStyle} className="text-base font-semibold uppercase mb-1">Education</h2>
            <div className="h-1 w-12 mb-3" style={sectionDividerStyle}></div>
            <div className="space-y-3">
              {education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p>{edu.institution}, {edu.location}</p>
                    <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">Education will appear here...</p>
              )}
            </div>
          </div>
          
          <div className="w-1/2">
            <h2 style={sectionTitleStyle} className="text-base font-semibold uppercase mb-1">Certifications</h2>
            <div className="h-1 w-12 mb-3" style={sectionDividerStyle}></div>
            <div className="space-y-2">
              {certifications.length > 0 ? (
                certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <h3 className="font-bold">{cert.name}</h3>
                    <p>{cert.issuer}</p>
                    <p className="text-gray-600">{cert.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">Certifications will appear here...</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Skills and Languages side by side */}
        <div className="flex gap-6">
          <div className="w-1/2">
            <h2 style={sectionTitleStyle} className="text-base font-semibold uppercase mb-1">Core Skills</h2>
            <div className="h-1 w-12 mb-3" style={sectionDividerStyle}></div>
            {skills.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: primaryColor }}></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Skills will appear here...</p>
            )}
          </div>
          
          <div className="w-1/2">
            <h2 style={sectionTitleStyle} className="text-base font-semibold uppercase mb-1">Languages</h2>
            <div className="h-1 w-12 mb-3" style={sectionDividerStyle}></div>
            {languages.length > 0 ? (
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between">
                    <span className="font-medium">{language.name}</span>
                    <span>{language.proficiency}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Languages will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
