import type { ResumeData } from '@/types/resume';

const sampleResumeData: ResumeData = {
  personalInfo: {
    name: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    summary: "Summary will be added here"
  },
  experiences: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      startDate: "2021",
      endDate: "Present",
      current: true,
      description: "Lead developer for e-commerce platform, implemented microservices architecture, optimized database queries, and led team of 5 developers."
    },
    {
      id: "2",
      company: "Startup Co.",
      position: "Software Engineer",
      startDate: "2018",
      endDate: "2021",
      current: false,
      description: "Developed full-stack applications using React and Node.js, implemented CI/CD pipelines, and mentored junior developers."
    }
  ],
  projects: [
    {
      id: "1",
      name: "E-Commerce Platform",
      description: "Built a scalable e-commerce platform handling 100K+ users daily. Implemented real-time analytics dashboard and automated testing framework.",
      technologies: ["React", "Node.js", "MongoDB", "Docker", "Kubernetes"],
      startDate: "2021",
      endDate: "Present"
    },
    {
      id: "2",
      name: "Analytics Dashboard",
      description: "Developed a real-time analytics dashboard using React and D3.js. Implemented data visualization components and automated data processing pipelines.",
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
      startDate: "2020",
      endDate: "2021"
    }
  ],
  skills: [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Python", level: 65 },
    { name: "Docker", level: 70 }
  ],
  education: [],
  certifications: [],
  internships: [],
  languages: []
};

export default sampleResumeData;
      current: false,
      description: "Assisted in the development of a web application using React and Node.js."
    }
  ],
  languages: [
    { name: "English", proficiency: 95 },
    { name: "Spanish", proficiency: 70 }
  ]
};

export type SampleResumeData = typeof sampleResumeData;
