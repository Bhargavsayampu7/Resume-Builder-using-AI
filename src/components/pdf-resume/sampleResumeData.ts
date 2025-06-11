import type { ResumeData } from '../../contexts/ResumeContext';

export type SampleResumeData = ResumeData;

export const sampleResumeData: SampleResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with a passion for building scalable web applications."
  },
  experiences: [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      startDate: "2020-01-01",
      endDate: "2023-01-01",
      current: false,
      description: "Led a team of developers in building and maintaining web applications using React and Node.js."
    },
    {
      id: "exp2",
      title: "Software Engineer",
      company: "StartupCo",
      location: "San Francisco, CA",
      startDate: "2018-01-01",
      endDate: "2020-01-01",
      current: false,
      description: "Developed and maintained web applications using React and Node.js."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California",
      location: "Berkeley, CA",
      startDate: "2014-01-01",
      endDate: "2018-01-01",
      description: "Major in Computer Science with a focus on software engineering."
    }
  ],
  skills: [
    {
      id: "skill1",
      name: "React",
      level: 4
    },
    {
      id: "skill2",
      name: "Node.js",
      level: 4
    },
    {
      id: "skill3",
      name: "TypeScript",
      level: 3
    }
  ],
  projects: [
    {
      id: "proj1",
      name: "E-Commerce Platform",
      description: "Built a scalable e-commerce platform using React and Node.js.",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      startDate: "2022-01-01",
      endDate: "2022-06-01"
    }
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022-01-01",
      credentialID: "ABC123"
    }
  ],
  internships: [
    {
      id: "int1",
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      startDate: "2017-06-01",
      endDate: "2017-09-01",
      description: "Worked on building web applications using React and Node.js."
    }
  ],
  languages: [
    {
      id: "lang1",
      name: "English",
      proficiency: "native"
    },
    {
      id: "lang2",
      name: "Spanish",
      proficiency: "fluent"
    }
  ]
};
