/**
 * Role-specific templates and prompts for AI generation
 */

interface RoleTemplate {
  title: string;
  keywords: string[];
  technicalSkills: string[];
  softSkills: string[];
  industrySkills: string[];
  summaryPrompt: string;
  focusAreas: string[];
}

type RoleTemplateMap = {
  [key: string]: RoleTemplate;
};

// Map of role keywords to their templates
export const roleKeywordMap: Record<string, string> = {
  // Tech roles
  'developer': 'softwareDeveloper',
  'engineer': 'softwareDeveloper',
  'programmer': 'softwareDeveloper',
  'coder': 'softwareDeveloper',
  'software': 'softwareDeveloper',
  'web': 'softwareDeveloper',
  'mobile': 'softwareDeveloper',
  'frontend': 'softwareDeveloper',
  'backend': 'softwareDeveloper',
  'fullstack': 'softwareDeveloper',
  'devops': 'devOpsEngineer',
  'cloud': 'devOpsEngineer',
  'data scientist': 'dataScientist',
  'data analyst': 'dataAnalyst',
  'analyst': 'dataAnalyst',
  'machine learning': 'dataScientist',
  'ai': 'dataScientist',
  'artificial intelligence': 'dataScientist',
  'product manager': 'productManager',
  'project manager': 'projectManager',
  'scrum master': 'projectManager',
  'agile': 'projectManager',
  
  // Marketing roles
  'marketing': 'marketingManager',
  'digital marketing': 'marketingManager',
  'content': 'contentCreator',
  'seo': 'marketingManager',
  'social media': 'marketingManager',
  'brand': 'marketingManager',
  'pr': 'publicRelations',
  'public relations': 'publicRelations',
  
  // Healthcare roles
  'nurse': 'healthcare',
  'doctor': 'healthcare',
  'physician': 'healthcare',
  'medical': 'healthcare',
  'healthcare': 'healthcare',
  'health': 'healthcare',
  'clinical': 'healthcare',
  
  // Education roles
  'teacher': 'education',
  'professor': 'education',
  'instructor': 'education',
  'tutor': 'education',
  'education': 'education',
  'teaching': 'education',
  'academic': 'education',
  
  // Sales roles
  'sales': 'salesRepresentative',
  'account manager': 'salesRepresentative',
  'business development': 'salesRepresentative',
  'customer success': 'customerService',
  'customer service': 'customerService',
  'support': 'customerService',
  
  // Hospitality roles
  'hospitality': 'hospitalityManager',
  'hotel': 'hospitalityManager',
  'restaurant': 'hospitalityManager',
  'chef': 'hospitalityManager',
  'food': 'hospitalityManager',
  'beverage': 'hospitalityManager',
  'catering': 'hospitalityManager',
  
  // Finance roles
  'finance': 'financeManager',
  'accounting': 'financeManager',
  'accountant': 'financeManager',
  'financial': 'financeManager',
  'banking': 'financeManager',
  'investment': 'financeManager',
  
  // HR roles
  'hr': 'humanResources',
  'human resources': 'humanResources',
  'talent': 'humanResources',
  'recruiting': 'humanResources',
  'recruiter': 'humanResources',
  
  // Design roles
  'designer': 'designer',
  'ux': 'designer',
  'ui': 'designer',
  'graphic': 'designer',
  'creative': 'designer',
  'design': 'designer',
};

// Role templates with specific information for each role
export const roleTemplates: RoleTemplateMap = {
  softwareDeveloper: {
    title: 'Software Developer',
    keywords: ['develop', 'implement', 'code', 'program', 'architect', 'design', 'test', 'debug', 'deploy', 'maintain', 'optimize', 'scale'],
    technicalSkills: [
      'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java', 'C#', '.NET', 'PHP',
      'HTML', 'CSS', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
      'Git', 'CI/CD', 'RESTful APIs', 'GraphQL', 'Microservices', 'Redux', 'Express.js', 'Spring Boot', 'Django', 'Flask'
    ],
    softSkills: [
      'Problem Solving', 'Critical Thinking', 'Attention to Detail', 'Teamwork', 'Communication',
      'Time Management', 'Adaptability', 'Creativity', 'Analytical Skills', 'Collaboration'
    ],
    industrySkills: [
      'Agile Methodology', 'Scrum', 'Test-Driven Development', 'Object-Oriented Programming',
      'Functional Programming', 'System Design', 'Code Review', 'Performance Optimization',
      'Debugging', 'Refactoring', 'DevOps', 'Full-Stack Development'
    ],
    summaryPrompt: 'Create a professional summary for a Software Developer that emphasizes technical expertise, problem-solving abilities, and experience with modern development practices.',
    focusAreas: ['Technical expertise', 'Problem-solving', 'Software architecture', 'Development methodologies', 'Collaboration']
  },
  
  dataScientist: {
    title: 'Data Scientist',
    keywords: ['analyze', 'model', 'predict', 'visualize', 'interpret', 'extract', 'mine', 'process', 'transform', 'algorithm', 'insight'],
    technicalSkills: [
      'Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn',
      'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Tableau', 'Power BI', 'Big Data', 'Hadoop', 'Spark',
      'NLP', 'Computer Vision', 'Statistical Analysis', 'A/B Testing', 'Feature Engineering'
    ],
    softSkills: [
      'Analytical Thinking', 'Problem Solving', 'Critical Thinking', 'Communication', 'Storytelling',
      'Attention to Detail', 'Curiosity', 'Teamwork', 'Business Acumen', 'Research'
    ],
    industrySkills: [
      'Predictive Modeling', 'Data Visualization', 'Data Cleaning', 'Hypothesis Testing',
      'Regression Analysis', 'Classification', 'Clustering', 'Time Series Analysis',
      'Natural Language Processing', 'Reinforcement Learning', 'Neural Networks'
    ],
    summaryPrompt: 'Create a professional summary for a Data Scientist that highlights analytical skills, experience with machine learning, and ability to derive actionable insights from complex data.',
    focusAreas: ['Data analysis', 'Machine learning', 'Statistical modeling', 'Insight generation', 'Business impact']
  },
  
  dataAnalyst: {
    title: 'Data Analyst',
    keywords: ['analyze', 'report', 'visualize', 'interpret', 'extract', 'process', 'dashboard', 'metric', 'kpi', 'trend', 'insight'],
    technicalSkills: [
      'SQL', 'Excel', 'Python', 'R', 'Tableau', 'Power BI', 'Google Analytics', 'Data Studio',
      'ETL', 'Data Warehousing', 'Data Modeling', 'Statistics', 'Pandas', 'NumPy',
      'Matplotlib', 'Seaborn', 'Data Cleaning', 'Data Visualization'
    ],
    softSkills: [
      'Analytical Thinking', 'Problem Solving', 'Attention to Detail', 'Communication',
      'Critical Thinking', 'Storytelling', 'Time Management', 'Organization', 'Teamwork'
    ],
    industrySkills: [
      'Business Intelligence', 'Data Quality Assessment', 'KPI Development', 'Dashboard Creation',
      'Report Automation', 'A/B Testing', 'Data Governance', 'Requirements Gathering',
      'Process Improvement', 'Stakeholder Management'
    ],
    summaryPrompt: 'Create a professional summary for a Data Analyst that emphasizes skills in data analysis, visualization, and translating complex data into actionable business insights.',
    focusAreas: ['Data analysis', 'Reporting', 'Visualization', 'Business intelligence', 'Decision support']
  },
  
  projectManager: {
    title: 'Project Manager',
    keywords: ['manage', 'coordinate', 'plan', 'execute', 'deliver', 'track', 'budget', 'schedule', 'risk', 'stakeholder', 'team'],
    technicalSkills: [
      'Microsoft Project', 'Jira', 'Asana', 'Trello', 'Confluence', 'Slack', 'Excel',
      'PowerPoint', 'Gantt Charts', 'Budgeting', 'Resource Allocation', 'Risk Assessment',
      'Reporting', 'Documentation', 'Roadmapping'
    ],
    softSkills: [
      'Leadership', 'Communication', 'Problem Solving', 'Decision Making', 'Negotiation',
      'Conflict Resolution', 'Time Management', 'Organization', 'Adaptability', 'Delegation'
    ],
    industrySkills: [
      'Agile Methodology', 'Scrum', 'Kanban', 'Waterfall', 'Prince2', 'PMP', 'CAPM',
      'Stakeholder Management', 'Change Management', 'Requirements Gathering',
      'Process Improvement', 'Team Building', 'Strategic Planning'
    ],
    summaryPrompt: 'Create a professional summary for a Project Manager that highlights leadership abilities, experience in project delivery, and skills in managing teams and resources effectively.',
    focusAreas: ['Project delivery', 'Team leadership', 'Stakeholder management', 'Budget control', 'Risk management']
  },
  
  marketingManager: {
    title: 'Marketing Manager',
    keywords: ['market', 'promote', 'brand', 'campaign', 'strategy', 'audience', 'content', 'digital', 'social', 'analytics', 'conversion'],
    technicalSkills: [
      'Google Analytics', 'Google Ads', 'Facebook Ads', 'Instagram', 'LinkedIn Marketing',
      'SEO', 'SEM', 'Email Marketing', 'CRM', 'HubSpot', 'Mailchimp', 'Marketo',
      'Adobe Creative Suite', 'Content Management Systems', 'WordPress', 'Hootsuite', 'Buffer'
    ],
    softSkills: [
      'Creativity', 'Communication', 'Strategic Thinking', 'Problem Solving', 'Adaptability',
      'Teamwork', 'Leadership', 'Time Management', 'Organization', 'Presentation Skills'
    ],
    industrySkills: [
      'Digital Marketing', 'Content Marketing', 'Social Media Marketing', 'Brand Management',
      'Market Research', 'Campaign Management', 'Lead Generation', 'Customer Acquisition',
      'Marketing Automation', 'Competitive Analysis', 'A/B Testing', 'Conversion Optimization'
    ],
    summaryPrompt: 'Create a professional summary for a Marketing Manager that emphasizes strategic marketing expertise, campaign management experience, and ability to drive brand growth and customer engagement.',
    focusAreas: ['Marketing strategy', 'Campaign management', 'Brand development', 'Digital marketing', 'Performance analysis']
  },
  
  salesRepresentative: {
    title: 'Sales Representative',
    keywords: ['sell', 'prospect', 'negotiate', 'close', 'client', 'customer', 'revenue', 'quota', 'pipeline', 'relationship', 'account'],
    technicalSkills: [
      'CRM Software', 'Salesforce', 'HubSpot', 'Microsoft Dynamics', 'LinkedIn Sales Navigator',
      'Outreach', 'SalesLoft', 'ZoomInfo', 'Excel', 'PowerPoint', 'Proposal Software',
      'Contract Management', 'Pricing Tools'
    ],
    softSkills: [
      'Communication', 'Negotiation', 'Persuasion', 'Relationship Building', 'Active Listening',
      'Resilience', 'Self-Motivation', 'Time Management', 'Organization', 'Confidence'
    ],
    industrySkills: [
      'Consultative Selling', 'Solution Selling', 'SPIN Selling', 'Account Management',
      'Territory Management', 'Pipeline Management', 'Lead Generation', 'Cold Calling',
      'Objection Handling', 'Closing Techniques', 'Customer Needs Analysis', 'Upselling'
    ],
    summaryPrompt: 'Create a professional summary for a Sales Representative that highlights strong sales skills, relationship-building abilities, and track record of meeting or exceeding sales targets.',
    focusAreas: ['Sales performance', 'Client relationships', 'Revenue generation', 'Territory management', 'Solution selling']
  },
  
  healthcare: {
    title: 'Healthcare Professional',
    keywords: ['patient', 'care', 'treatment', 'diagnosis', 'medical', 'health', 'clinical', 'therapeutic', 'assessment', 'intervention'],
    technicalSkills: [
      'Electronic Health Records (EHR)', 'Medical Terminology', 'Patient Assessment',
      'Vital Signs Monitoring', 'Medication Administration', 'Treatment Planning',
      'Clinical Documentation', 'Medical Equipment Operation', 'Infection Control',
      'First Aid', 'CPR', 'HIPAA Compliance'
    ],
    softSkills: [
      'Compassion', 'Communication', 'Attention to Detail', 'Critical Thinking',
      'Empathy', 'Teamwork', 'Adaptability', 'Stress Management', 'Time Management',
      'Ethical Decision Making'
    ],
    industrySkills: [
      'Patient Care', 'Care Coordination', 'Health Promotion', 'Disease Management',
      'Interdisciplinary Collaboration', 'Evidence-Based Practice', 'Quality Improvement',
      'Patient Education', 'Crisis Management', 'Case Management'
    ],
    summaryPrompt: 'Create a professional summary for a Healthcare Professional that emphasizes patient care expertise, clinical skills, and commitment to providing high-quality healthcare services.',
    focusAreas: ['Patient care', 'Clinical expertise', 'Healthcare delivery', 'Medical knowledge', 'Compassionate service']
  },
  
  education: {
    title: 'Education Professional',
    keywords: ['teach', 'educate', 'instruct', 'mentor', 'curriculum', 'lesson', 'student', 'learning', 'assessment', 'classroom'],
    technicalSkills: [
      'Curriculum Development', 'Lesson Planning', 'Student Assessment', 'Educational Technology',
      'Learning Management Systems', 'Google Classroom', 'Canvas', 'Blackboard', 'Microsoft Office',
      'Smart Boards', 'Online Teaching Tools', 'Grading Systems'
    ],
    softSkills: [
      'Communication', 'Patience', 'Adaptability', 'Creativity', 'Organization',
      'Leadership', 'Empathy', 'Conflict Resolution', 'Time Management', 'Active Listening'
    ],
    industrySkills: [
      'Differentiated Instruction', 'Classroom Management', 'Student Engagement',
      'Formative Assessment', 'Summative Assessment', 'Inquiry-Based Learning',
      'Project-Based Learning', 'Behavior Management', 'IEP Development',
      'Parent Communication', 'Professional Development'
    ],
    summaryPrompt: 'Create a professional summary for an Education Professional that highlights teaching expertise, ability to engage students, and commitment to fostering a positive learning environment.',
    focusAreas: ['Teaching excellence', 'Student development', 'Curriculum design', 'Educational leadership', 'Learning outcomes']
  },
  
  hospitalityManager: {
    title: 'Hospitality Manager',
    keywords: ['guest', 'service', 'hotel', 'restaurant', 'hospitality', 'customer', 'experience', 'satisfaction', 'operations', 'staff'],
    technicalSkills: [
      'Property Management Systems', 'Point of Sale (POS) Systems', 'Reservation Systems',
      'Revenue Management', 'Inventory Management', 'Food & Beverage Management',
      'Budgeting', 'Scheduling Software', 'Microsoft Office', 'CRM Systems'
    ],
    softSkills: [
      'Customer Service', 'Leadership', 'Communication', 'Problem Solving', 'Adaptability',
      'Attention to Detail', 'Time Management', 'Organization', 'Teamwork', 'Conflict Resolution'
    ],
    industrySkills: [
      'Guest Relations', 'Staff Training', 'Quality Assurance', 'Event Management',
      'Crisis Management', 'Health & Safety Compliance', 'Vendor Management',
      'Facilities Management', 'Customer Experience Design', 'Upselling Techniques'
    ],
    summaryPrompt: 'Create a professional summary for a Hospitality Manager that emphasizes guest service excellence, operational management skills, and ability to lead teams in delivering exceptional experiences.',
    focusAreas: ['Guest satisfaction', 'Operational excellence', 'Team leadership', 'Revenue management', 'Service quality']
  },
  
  financeManager: {
    title: 'Finance Professional',
    keywords: ['finance', 'accounting', 'budget', 'forecast', 'analysis', 'report', 'compliance', 'audit', 'tax', 'investment'],
    technicalSkills: [
      'Excel', 'QuickBooks', 'SAP', 'Oracle', 'Financial Modeling', 'Forecasting',
      'Budgeting', 'Financial Analysis', 'Accounting Software', 'ERP Systems',
      'Power BI', 'Tableau', 'SQL', 'VBA', 'Bloomberg Terminal'
    ],
    softSkills: [
      'Analytical Thinking', 'Attention to Detail', 'Problem Solving', 'Communication',
      'Integrity', 'Time Management', 'Organization', 'Critical Thinking', 'Teamwork'
    ],
    industrySkills: [
      'Financial Reporting', 'Variance Analysis', 'Cost Accounting', 'Risk Management',
      'Regulatory Compliance', 'Tax Planning', 'Audit Preparation', 'Cash Flow Management',
      'Capital Budgeting', 'Investment Analysis', 'Financial Controls'
    ],
    summaryPrompt: 'Create a professional summary for a Finance Professional that highlights financial expertise, analytical skills, and ability to drive financial performance and compliance.',
    focusAreas: ['Financial analysis', 'Regulatory compliance', 'Strategic planning', 'Risk management', 'Performance optimization']
  },
  
  humanResources: {
    title: 'Human Resources Professional',
    keywords: ['recruit', 'hire', 'onboard', 'train', 'develop', 'performance', 'policy', 'benefit', 'compensation', 'employee'],
    technicalSkills: [
      'HRIS', 'ATS', 'Workday', 'SAP SuccessFactors', 'BambooHR', 'Payroll Systems',
      'Benefits Administration', 'Performance Management Systems', 'Microsoft Office',
      'LinkedIn Recruiter', 'Survey Tools', 'Learning Management Systems'
    ],
    softSkills: [
      'Communication', 'Empathy', 'Discretion', 'Conflict Resolution', 'Negotiation',
      'Organization', 'Time Management', 'Relationship Building', 'Active Listening',
      'Decision Making'
    ],
    industrySkills: [
      'Talent Acquisition', 'Employee Relations', 'Performance Management', 'Training & Development',
      'Compensation & Benefits', 'HR Compliance', 'Policy Development', 'Workforce Planning',
      'Diversity & Inclusion', 'Employee Engagement', 'Succession Planning'
    ],
    summaryPrompt: 'Create a professional summary for a Human Resources Professional that emphasizes HR expertise, employee development skills, and ability to align HR strategies with organizational goals.',
    focusAreas: ['Talent management', 'Employee relations', 'HR compliance', 'Organizational development', 'Strategic HR']
  },
  
  designer: {
    title: 'Designer',
    keywords: ['design', 'create', 'visual', 'user', 'interface', 'experience', 'brand', 'creative', 'aesthetic', 'prototype'],
    technicalSkills: [
      'Adobe Creative Suite', 'Photoshop', 'Illustrator', 'InDesign', 'XD', 'Figma',
      'Sketch', 'Invision', 'Procreate', 'HTML/CSS', 'Typography', 'Color Theory',
      'Wireframing', 'Prototyping', 'Animation', 'Photography'
    ],
    softSkills: [
      'Creativity', 'Attention to Detail', 'Communication', 'Problem Solving', 'Time Management',
      'Adaptability', 'Teamwork', 'Critical Thinking', 'Active Listening', 'Presentation Skills'
    ],
    industrySkills: [
      'UI/UX Design', 'Graphic Design', 'Web Design', 'Brand Identity', 'Visual Design',
      'User Research', 'Usability Testing', 'Responsive Design', 'Information Architecture',
      'Design Systems', 'Accessibility', 'Print Design'
    ],
    summaryPrompt: 'Create a professional summary for a Designer that highlights creative abilities, design expertise, and skill in creating engaging visual experiences that meet user and business needs.',
    focusAreas: ['Design excellence', 'Creative problem-solving', 'User experience', 'Visual communication', 'Brand development']
  },
  
  // Default template for roles not specifically defined
  default: {
    title: 'Professional',
    keywords: ['manage', 'develop', 'implement', 'coordinate', 'analyze', 'create', 'lead', 'support', 'improve', 'deliver'],
    technicalSkills: [
      'Microsoft Office', 'Excel', 'Word', 'PowerPoint', 'Google Workspace', 'Project Management',
      'Data Analysis', 'Research', 'Reporting', 'Presentation', 'CRM', 'Email'
    ],
    softSkills: [
      'Communication', 'Problem Solving', 'Critical Thinking', 'Teamwork', 'Leadership',
      'Time Management', 'Organization', 'Adaptability', 'Attention to Detail', 'Creativity'
    ],
    industrySkills: [
      'Project Management', 'Strategic Planning', 'Process Improvement', 'Team Leadership',
      'Client Relations', 'Stakeholder Management', 'Quality Assurance', 'Risk Management',
      'Performance Analysis', 'Resource Management'
    ],
    summaryPrompt: 'Create a professional summary that highlights relevant skills, experience, and strengths for a professional role.',
    focusAreas: ['Professional expertise', 'Leadership', 'Project delivery', 'Problem-solving', 'Collaboration']
  }
};

/**
 * Find the most appropriate role template based on job title
 */
export function findRoleTemplate(jobTitle: string): RoleTemplate {
  if (!jobTitle) return roleTemplates.default;
  
  const lowerTitle = jobTitle.toLowerCase();
  
  // Check for direct matches in the keyword map
  for (const [keyword, templateKey] of Object.entries(roleKeywordMap)) {
    if (lowerTitle.includes(keyword)) {
      return roleTemplates[templateKey] || roleTemplates.default;
    }
  }
  
  // If no match found, return default template
  return roleTemplates.default;
}

/**
 * Generate a prompt for creating a role-specific summary
 */
export function generateSummaryPrompt(role: string, skills: string[] = [], experiences: any[] = [], yearsOfExperience: number = 0): string {
  const template = findRoleTemplate(role);
  
  let prompt = template.summaryPrompt;
  
  // Add experience level context
  if (yearsOfExperience > 0) {
    prompt += ` The person has ${yearsOfExperience} years of experience in this field.`;
  } else if (experiences.length > 0) {
    prompt += ` The person has some experience in this field.`;
  } else {
    prompt += ` The person is relatively new to this field.`;
  }
  
  // Add skills context
  if (skills.length > 0) {
    prompt += ` Their key skills include: ${skills.join(', ')}.`;
  }
  
  // Add experience context
  if (experiences.length > 0) {
    prompt += ` Their work experience includes:`;
    experiences.slice(0, 3).forEach((exp: any) => {
      prompt += ` ${exp.title} at ${exp.company},`;
    });
    // Remove the trailing comma
    prompt = prompt.slice(0, -1) + '.'; 
  }
  
  // Add formatting instructions
  prompt += ` The summary should be professional, concise (2-3 sentences), highlight their strengths, and be tailored for their resume. Use active voice and impactful language. Do not use clichés or generic phrases.`;
  
  return prompt;
}

/**
 * Get suggested skills for a specific role
 */
export function getRoleSkills(role: string): {
  technicalSkills: string[];
  softSkills: string[];
  industrySkills: string[];
} {
  const template = findRoleTemplate(role);
  
  return {
    technicalSkills: template.technicalSkills,
    softSkills: template.softSkills,
    industrySkills: template.industrySkills
  };
}
