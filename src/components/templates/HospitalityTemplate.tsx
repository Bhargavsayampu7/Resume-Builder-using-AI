import { useResume } from '@/contexts/ResumeContext';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const HospitalityTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, languages, certifications } = resumeData;
  const { primaryColor, fontFamily, showProfileImage } = templateCustomization;

  // Generate dynamic styles
  const accentColor = primaryColor || '#2E5984';
  
  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[10px] leading-tight flex" style={{ fontFamily }}>
      {/* Left Section */}
      <div className="w-2/3 p-6">
        <header className="mb-5">
          <h1 className="text-2xl font-bold" style={{ color: accentColor }}>{personalInfo.name || 'Your Name'}</h1>
          <p className="text-sm text-gray-600">Hotel Manager</p>
        </header>
        
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-2 uppercase" style={{ color: accentColor }}>Summary</h2>
            <p className="text-[9px] text-gray-700">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3 uppercase" style={{ color: accentColor }}>Experience</h2>
          
          {experiences.length > 0 ? (
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px]">{exp.title}</h3>
                    <span className="text-[9px] text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-[10px] font-medium">{exp.company}</p>
                  <p className="text-[9px] text-gray-600">{exp.location}</p>
                  <ul className="list-disc list-inside text-[9px] mt-1 text-gray-700 space-y-1 ml-1">
                    {exp.description.split('\n').map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-[11px]">Hotel Manager</h3>
                <span className="text-[9px] text-gray-600">2022 - Present</span>
              </div>
              <p className="text-[10px] font-medium">Luxury Hotel & Resort</p>
              <p className="text-[9px] text-gray-600">San Francisco, CA</p>
              <ul className="list-disc list-inside text-[9px] mt-1 text-gray-700 space-y-1 ml-1">
                <li>Successfully implemented cost-saving measures resulting in a 10% decrease in operational expenses.</li>
                <li>Developed employee training programs resulting in a 15% increase in employee satisfaction.</li>
                <li>Collaborated with the marketing team to create innovative promotional campaigns.</li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Education */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3 uppercase" style={{ color: accentColor }}>Education</h2>
          
          {education.length > 0 ? (
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px]">{edu.degree}</h3>
                    <span className="text-[9px] text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-[10px]">{edu.institution}, {edu.location}</p>
                  {edu.description && <p className="text-[9px] text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[9px] text-gray-400 italic">Education will appear here...</p>
          )}
        </div>
        
        {/* Certifications */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase" style={{ color: accentColor }}>Certifications</h2>
          
          {certifications.length > 0 ? (
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <h3 className="font-semibold text-[11px]">{cert.name}</h3>
                  <p className="text-[9px] text-gray-600">{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[9px] text-gray-400 italic">Certifications will appear here...</p>
          )}
        </div>
      </div>
      
      {/* Right Section */}
      <div className="w-1/3 p-6" style={{ backgroundColor: accentColor, color: 'white' }}>
        {/* Contact Info */}
        <div className="mb-6">
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
          
          <h2 className="text-sm font-semibold uppercase mb-3 border-b border-white/30 pb-1">Contact</h2>
          
          <div className="space-y-2">
            {personalInfo.phone && (
              <div className="flex items-center text-[9px]">
                <Phone className="h-3 w-3 mr-2" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.email && (
              <div className="flex items-center text-[9px]">
                <Mail className="h-3 w-3 mr-2" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center text-[9px]">
                <MapPin className="h-3 w-3 mr-2" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center text-[9px]">
                <Linkedin className="h-3 w-3 mr-2" />
                <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                   target="_blank" rel="noopener noreferrer" className="text-white">
                  {personalInfo.linkedin.split('/').pop()}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase mb-3 border-b border-white/30 pb-1">Strengths</h2>
          
          {skills.length > 0 ? (
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <span className="text-[9px]">{skill.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="mb-3">
                <h3 className="text-[10px] font-semibold mb-1">Leadership</h3>
                <p className="text-[9px] opacity-80">Led a team of 100+ employees, fostering a collaborative work environment</p>
              </div>
              
              <div className="mb-3">
                <h3 className="text-[10px] font-semibold mb-1">Problem-Solving</h3>
                <p className="text-[9px] opacity-80">Proactively addressed operational challenges with effective solutions</p>
              </div>
              
              <div className="mb-3">
                <h3 className="text-[10px] font-semibold mb-1">Adaptability</h3>
                <p className="text-[9px] opacity-80">Successfully managed multiple projects in fast-paced environment</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Languages */}
        <div>
          <h2 className="text-sm font-semibold uppercase mb-3 border-b border-white/30 pb-1">Languages</h2>
          
          {languages.length > 0 ? (
            <div className="space-y-2">
              {languages.map((language) => (
                <div key={language.id} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[9px]">{language.name}</span>
                    <span className="text-[9px] opacity-80">{language.proficiency}</span>
                  </div>
                  <div className="w-full h-1 bg-white/30 rounded-full">
                    <div 
                      className="h-full rounded-full bg-white" 
                      style={{
                        width: language.proficiency === 'native' ? '100%' :
                               language.proficiency === 'fluent' ? '80%' :
                               language.proficiency === 'intermediate' ? '60%' :
                               language.proficiency === 'basic' ? '40%' : '20%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[9px] opacity-70 italic">Languages will appear here...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalityTemplate;
