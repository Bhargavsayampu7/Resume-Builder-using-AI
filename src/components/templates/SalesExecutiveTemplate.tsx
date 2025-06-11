
import { useResume } from '@/contexts/ResumeContext';
import { Award, Linkedin, Mail, MapPin, Phone, Star } from 'lucide-react';

const SalesExecutiveTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, languages, certifications } = resumeData;
  const { primaryColor, fontFamily, showProfileImage } = templateCustomization;

  // Generate dynamic styles
  const accentColor = primaryColor || '#3B82F6';
  
  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[10px] leading-tight" style={{ fontFamily }}>
      {/* Header */}
      <header className="p-6 flex flex-col items-center border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-2xl font-bold text-center" style={{ color: accentColor }}>{personalInfo.name || 'Your Name'}</h1>
        <p className="text-sm text-gray-600 text-center mt-1">Senior Sales Executive</p>
        
        <div className="flex flex-wrap gap-x-4 mt-3 text-xs justify-center">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                 target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </header>
      
      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5">
            <h2 className="text-sm font-semibold uppercase mb-2 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>Summary</h2>
            <p className="text-gray-700 text-[9px]">{personalInfo.summary}</p>
          </div>
        )}
        
        <div className="flex gap-6">
          {/* Left Column */}
          <div className="w-3/5">
            {/* Experience */}
            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase mb-2 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>Experience</h2>
              
              {experiences.length > 0 ? (
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[11px]">{exp.title}</h3>
                        <span className="text-[9px] text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <p className="text-[9px] font-medium">{exp.company}, {exp.location}</p>
                      <ul className="list-disc list-inside text-[9px] mt-1 text-gray-700 space-y-1 ml-1">
                        {exp.description.split('\n').map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-[11px]">Senior Sales Executive</h3>
                      <span className="text-[9px] text-gray-600">2019 - Present</span>
                    </div>
                    <p className="text-[9px] font-medium">TechSolutions Group, Dallas, Texas</p>
                    <ul className="list-disc list-inside text-[9px] mt-1 text-gray-700 space-y-1 ml-1">
                      <li>Exceeded annual sales targets by 15% for three consecutive years</li>
                      <li>Developed and maintained a portfolio of 50+ key accounts with a retention rate of 95%</li>
                      <li>Implemented new sales strategies that increased new client acquisition by 25%</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            {/* Education */}
            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase mb-2 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>Education</h2>
              
              {education.length > 0 ? (
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[11px]">{edu.degree}</h3>
                        <span className="text-[9px] text-gray-600">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <p className="text-[9px]">{edu.institution}, {edu.location}</p>
                      {edu.description && <p className="text-[8px] text-gray-700 mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[9px] text-gray-400 italic">Education will appear here...</p>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w-2/5">
            {/* Skills */}
            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase mb-2 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>Skills</h2>
              
              {skills.length > 0 ? (
                <div>
                  {skills.map((skill) => (
                    <div key={skill.id} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-[9px] font-medium">{skill.name}</span>
                        {skill.level && (
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-2 w-2"
                                fill={i < skill.level ? accentColor : 'none'}
                                color={accentColor}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-[9px] font-medium">Account Management</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-2 w-2"
                            fill={i < 5 ? accentColor : 'none'}
                            color={accentColor}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-[9px] font-medium">Negotiation Skills</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-2 w-2"
                            fill={i < 4 ? accentColor : 'none'}
                            color={accentColor}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Certifications */}
            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase mb-2 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>Certifications</h2>
              
              {certifications.length > 0 ? (
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="mb-2 flex items-start">
                      <Award className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                      <div>
                        <p className="font-semibold text-[10px]">{cert.name}</p>
                        <p className="text-[8px] text-gray-600">{cert.issuer} | {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="mb-2 flex items-start">
                    <Award className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                    <div>
                      <p className="font-semibold text-[10px]">Certified Sales Professional</p>
                      <p className="text-[8px] text-gray-600">National Association of Sales Professionals | 2020</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Languages */}
            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase mb-2 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>Languages</h2>
              
              {languages.length > 0 ? (
                <div className="space-y-2">
                  {languages.map((language) => (
                    <div key={language.id} className="flex justify-between">
                      <span className="text-[9px]">{language.name}</span>
                      <span className="text-[9px] text-gray-600">{language.proficiency}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[9px]">English</span>
                    <span className="text-[9px] text-gray-600">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[9px]">Spanish</span>
                    <span className="text-[9px] text-gray-600">Conversational</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Achievements */}
            <div>
              <h2 className="text-sm font-semibold uppercase mb-2 pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>Achievements</h2>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full mt-1 mr-2" style={{ backgroundColor: accentColor }}></div>
                  <p className="text-[9px]">Top Sales Performer (2021, 2022)</p>
                </div>
                <div className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full mt-1 mr-2" style={{ backgroundColor: accentColor }}></div>
                  <p className="text-[9px]">President's Club Member</p>
                </div>
                <div className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full mt-1 mr-2" style={{ backgroundColor: accentColor }}></div>
                  <p className="text-[9px]">Increased sales by 30% in underperforming territory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesExecutiveTemplate;
