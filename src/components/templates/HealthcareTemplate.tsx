import { useResume } from '@/contexts/ResumeContext';
import { Mail, MapPin, Phone } from 'lucide-react';

const HealthcareTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, languages, certifications } = resumeData;
  const { primaryColor, fontFamily, showProfileImage } = templateCustomization;

  // Generate dynamic styles
  const accentColor = primaryColor || '#4FB3D9';
  
  const headerStyle = {
    backgroundColor: accentColor,
    color: 'white',
    fontFamily
  };

  const sectionHeadingStyle = {
    color: accentColor,
    fontFamily
  };

  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[10px] leading-tight" style={{ fontFamily }}>
      {/* Header with profile */}
      <header style={headerStyle} className="p-5 flex items-center">
        {showProfileImage && personalInfo.profileImage && (
          <div className="mr-4">
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
            />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">{personalInfo.name || 'Your Name'}</h1>
          <p className="text-sm opacity-90 mt-1">Healthcare Professional</p>
          
          <div className="flex flex-wrap gap-x-3 mt-2 text-xs opacity-90">
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-50 p-5">
          <div className="mb-6">
            <h2 style={sectionHeadingStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Profile</h2>
            {personalInfo.summary ? (
              <p className="text-[9px] text-gray-700">{personalInfo.summary}</p>
            ) : (
              <p className="text-[9px] text-gray-400 italic">Dedicated and compassionate healthcare professional with proven ability to remain calm under pressure and make critical decisions to ensure optimal patient outcomes.</p>
            )}
          </div>
          
          {/* Languages */}
          <div className="mb-6">
            <h2 style={sectionHeadingStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Languages</h2>
            {languages.length > 0 ? (
              <div>
                {languages.map((language, index) => (
                  <div key={language.id} className="mb-2">
                    <div className="flex justify-between">
                      <span className="text-[9px] font-medium">{language.name}</span>
                      <span className="text-[9px] text-gray-600">{language.proficiency}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-full rounded-full" 
                        style={{
                          width: language.proficiency === 'native' ? '100%' :
                                 language.proficiency === 'fluent' ? '80%' :
                                 language.proficiency === 'intermediate' ? '60%' :
                                 language.proficiency === 'basic' ? '40%' : '20%',
                          backgroundColor: accentColor
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="mb-2">
                  <div className="flex justify-between">
                    <span className="text-[9px] font-medium">English</span>
                    <span className="text-[9px] text-gray-600">Native</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                    <div className="h-full w-full rounded-full" style={{ backgroundColor: accentColor }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Education */}
          <div className="mb-6">
            <h2 style={sectionHeadingStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Education</h2>
            
            {education.length > 0 ? (
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="font-semibold text-[10px]">{edu.degree}</p>
                    <p className="text-[9px]">{edu.institution}</p>
                    <p className="text-[8px] text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[9px] text-gray-400 italic">Education will appear here...</p>
            )}
          </div>
          
          {/* Certifications */}
          <div>
            <h2 style={sectionHeadingStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Certifications</h2>
            
            {certifications.length > 0 ? (
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="font-semibold text-[10px]">{cert.name}</p>
                    <p className="text-[9px]">{cert.issuer} | {cert.date}</p>
                    {cert.credentialID && (
                      <p className="text-[8px] text-gray-600">ID: {cert.credentialID}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[9px] text-gray-400 italic">Certifications will appear here...</p>
            )}
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-2/3 p-5">
          {/* Experience */}
          <div className="mb-6">
            <h2 style={sectionHeadingStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Experience</h2>
            
            {experiences.length > 0 ? (
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between">
                      <p className="font-semibold text-[11px]">{exp.title}</p>
                      <p className="text-[9px] text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[10px] font-medium">{exp.company} | {exp.location}</p>
                    <ul className="list-disc list-inside text-[9px] mt-1 text-gray-700 space-y-1">
                      {exp.description.split('\n').map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mb-3">
                  <div className="flex justify-between">
                    <p className="font-semibold text-[11px]">Healthcare Professional</p>
                    <p className="text-[9px] text-gray-600">Sept. 2021 - Present</p>
                  </div>
                  <p className="text-[10px] font-medium">City Hospital | New York, USA</p>
                  <ul className="list-disc list-inside text-[9px] mt-1 text-gray-700 space-y-1">
                    <li>Respond promptly to medical needs, assessing and providing immediate care to patients</li>
                    <li>Administer life-saving interventions when necessary</li>
                    <li>Maintain accurate and detailed patient records</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Skills */}
          <div>
            <h2 style={sectionHeadingStyle} className="text-sm font-semibold uppercase mb-3 pb-1 border-b border-gray-200">Skills</h2>
            
            {skills.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-[9px]">{skill.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Patient Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Emergency Medical Procedures</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Advanced Life Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Basic Life Support</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareTemplate;
