import { useResume } from '@/contexts/ResumeContext';
import { Book, BookOpen, Mail, MapPin, Phone } from 'lucide-react';

const TeachingTemplate = () => {
  const { resumeData, templateCustomization } = useResume();
  const { personalInfo, skills, experiences, education, languages, certifications } = resumeData;
  const { primaryColor, fontFamily, showProfileImage } = templateCustomization;

  // Generate dynamic styles
  const accentColor = primaryColor || '#4F46E5';
  
  return (
    <div className="min-h-[842px] w-[595px] mx-auto bg-white shadow-md overflow-hidden text-[10px] leading-tight" style={{ fontFamily }}>
      {/* Header */}
      <header className="relative p-6 flex items-end" style={{ backgroundColor: accentColor, color: 'white', height: '120px' }}>
        <div className="flex flex-col items-start z-10 w-full">
          <h1 className="text-2xl font-bold tracking-wide">{personalInfo.name || 'Your Name'}</h1>
          <p className="text-sm opacity-90 mt-1">Educational Professional</p>
          
          <div className="flex w-full justify-between mt-2">
            <div className="flex flex-wrap gap-x-4 text-xs opacity-90">
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
            </div>
            
            {showProfileImage && personalInfo.profileImage && (
              <div className="relative -bottom-8">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={personalInfo.profileImage} 
                    alt={personalInfo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <div className="p-6 pt-10 flex gap-6">
        {/* Left Column */}
        <div className="w-2/3">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase mb-2" style={{ color: accentColor }}>Professional Summary</h2>
              <p className="text-[9px] text-gray-700">{personalInfo.summary}</p>
            </div>
          )}
          
          {/* Experience */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold uppercase mb-3" style={{ color: accentColor }}>Teaching Experience</h2>
            
            {experiences.length > 0 ? (
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="mb-3 relative pl-7">
                    <div className="absolute left-0 top-0">
                      <BookOpen className="h-5 w-5" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[11px]">{exp.title}</h3>
                        <span className="text-[9px] text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <p className="text-[10px] font-medium">{exp.company}, {exp.location}</p>
                      <ul className="list-disc list-inside text-[9px] mt-1 text-gray-700 space-y-1">
                        {exp.description.split('\n').map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-3 relative pl-7">
                <div className="absolute left-0 top-0">
                  <BookOpen className="h-5 w-5" style={{ color: accentColor }} />
                </div>
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-[11px]">High School Mathematics Teacher</h3>
                    <span className="text-[9px] text-gray-600">2018 - Present</span>
                  </div>
                  <p className="text-[10px] font-medium">Lincoln High School, Boston, MA</p>
                  <ul className="list-disc list-inside text-[9px] mt-1 text-gray-700 space-y-1">
                    <li>Developed and implemented engaging mathematics curriculum for grades 9-12</li>
                    <li>Utilized innovative teaching methods, resulting in a 15% increase in student test scores</li>
                    <li>Mentored struggling students through after-school tutoring program</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Education */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold uppercase mb-3" style={{ color: accentColor }}>Education</h2>
            
            {education.length > 0 ? (
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3 relative pl-7">
                    <div className="absolute left-0 top-0">
                      <Book className="h-5 w-5" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[11px]">{edu.degree}</h3>
                        <span className="text-[9px] text-gray-600">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <p className="text-[10px]">{edu.institution}, {edu.location}</p>
                      {edu.description && <p className="text-[9px] text-gray-700 mt-1">{edu.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[9px] text-gray-400 italic">Education will appear here...</p>
            )}
          </div>
          
          {/* Certifications */}
          <div>
            <h2 className="text-sm font-semibold uppercase mb-3" style={{ color: accentColor }}>Certifications</h2>
            
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
              <div className="space-y-2">
                <div className="mb-2">
                  <h3 className="font-semibold text-[11px]">State Teaching Certification</h3>
                  <p className="text-[9px] text-gray-600">Massachusetts Department of Education | 2018</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-1/3">
          {/* Skills */}
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
            <h2 className="text-sm font-semibold uppercase mb-3" style={{ color: accentColor }}>Teaching Skills</h2>
            
            {skills.length > 0 ? (
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-[9px]">{skill.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Curriculum Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Student Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Classroom Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Educational Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[9px]">Differentiated Instruction</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Languages */}
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
            <h2 className="text-sm font-semibold uppercase mb-3" style={{ color: accentColor }}>Languages</h2>
            
            {languages.length > 0 ? (
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-[9px] font-medium">{language.name}</span>
                      <span className="text-[9px] text-gray-600">{language.proficiency}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
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
              <p className="text-[9px] text-gray-400 italic">Languages will appear here...</p>
            )}
          </div>
          
          {/* Achievements */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
            <h2 className="text-sm font-semibold uppercase mb-3" style={{ color: accentColor }}>Achievements</h2>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full mt-1 mr-2" style={{ backgroundColor: accentColor }}></div>
                <p className="text-[9px]">Teacher of the Year Award (2021)</p>
              </div>
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full mt-1 mr-2" style={{ backgroundColor: accentColor }}></div>
                <p className="text-[9px]">Led student team to state mathematics competition finals</p>
              </div>
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full mt-1 mr-2" style={{ backgroundColor: accentColor }}></div>
                <p className="text-[9px]">Developed innovative curriculum adopted by district</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingTemplate;
