import { useResume } from '@/contexts/ResumeContext';

const BusinessTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, languages, internships } = resumeData;
  const { primaryColor } = templateCustomization;

  // Generate dynamic style based on primary color
  const accentStyle = {
    color: primaryColor
  };

  const sectionTitleStyle = {
    borderBottom: `2px solid ${primaryColor}`,
    color: '#333'
  };

  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[11px] leading-tight">
      {/* Header */}
      <header className="p-6 text-center border-b-2" style={{ borderColor: primaryColor }}>
        <h1 className="text-2xl font-bold tracking-wide" style={accentStyle}>{personalInfo.name || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 mt-3 text-xs text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase pb-1 mb-2">Professional Summary</h2>
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
        
        {/* Education */}
        <div className="mb-5">
          <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase pb-1 mb-2">Education</h2>
          <div className="space-y-2">
            {education.length > 0 ? (
              education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold" style={accentStyle}>{edu.degree}</h3>
                    <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  </div>
                  <p className="font-medium">{edu.institution}, {edu.location}</p>
                  {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">Education will appear here...</p>
            )}
          </div>
        </div>
        
        {/* Skills and Languages */}
        <div className="flex">
          {/* Skills */}
          <div className="w-1/2 pr-2">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase pb-1 mb-2">Skills</h2>
            {skills.length > 0 ? (
              <ul className="list-disc list-inside columns-2 text-gray-700">
                {skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">Skills will appear here...</p>
            )}
          </div>
          
          {/* Languages */}
          <div className="w-1/2 pl-2">
            <h2 style={sectionTitleStyle} className="text-sm font-semibold uppercase pb-1 mb-2">Languages</h2>
            {languages.length > 0 ? (
              <ul className="space-y-1 text-gray-700">
                {languages.map((language) => (
                  <li key={language.id}>
                    <span className="font-medium">{language.name}</span> - {language.proficiency}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">Languages will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTemplate;
