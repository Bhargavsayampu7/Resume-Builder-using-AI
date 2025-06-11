/**
 * Service for AI-related functionality using the Gemini API
 * Currently using mock responses until API integration is fixed
 */
import { generateSummaryPrompt, getRoleSkills, findRoleTemplate } from '@/utils/roleTemplates';
import { generateGrammarPrompt, TextContext, getExampleImprovement } from '@/utils/grammarChecker';

interface GenerateSummaryParams {
  role: string;
  skills?: string[];
  experiences?: Array<{
    title: string;
    company: string;
    description: string;
  }>;
  yearsOfExperience?: number;
}

export class AIService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    // We're using mock responses for now, so we don't strictly need the API key
    // but we'll keep the check for future implementation
    if (!this.apiKey) {
      console.warn('GEMINI_API_KEY is not set, using mock responses');
    }
  }

  /**
   * Generate a professional summary based on the applicant's role and experience
   * Currently returns a mock response based on the role
   */
  async generateSummary({ role, skills = [], experiences = [] }: GenerateSummaryParams): Promise<string> {
    try {
      console.log('Generating summary for role:', role);
      console.log('Skills:', skills);
      console.log('Experiences:', experiences);
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a summary based on the role
      let summary = '';
      
      if (role.toLowerCase().includes('developer') || role.toLowerCase().includes('engineer')) {
        summary = `Innovative ${role} with ${experiences.length > 0 ? 'proven experience' : 'strong skills'} in ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? ', and more' : ''}. Passionate about delivering high-quality solutions that drive business growth and enhance user experience. Committed to continuous learning and staying current with emerging technologies.`;
      } 
      else if (role.toLowerCase().includes('manager') || role.toLowerCase().includes('lead')) {
        summary = `Results-driven ${role} with ${experiences.length > 0 ? 'extensive experience' : 'strong capabilities'} in team leadership and project management. Skilled in ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? ', and more' : ''}. Adept at driving strategic initiatives, optimizing processes, and fostering collaborative environments to achieve organizational goals.`;
      }
      else if (role.toLowerCase().includes('designer')) {
        summary = `Creative ${role} with a keen eye for detail and ${experiences.length > 0 ? 'proven expertise' : 'strong abilities'} in ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? ', and more' : ''}. Passionate about creating intuitive, user-centered designs that balance aesthetics and functionality to deliver exceptional user experiences.`;
      }
      else if (role.toLowerCase().includes('analyst')) {
        summary = `Detail-oriented ${role} with ${experiences.length > 0 ? 'demonstrated success' : 'strong capabilities'} in data analysis and problem-solving. Proficient in ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? ', and more' : ''}. Skilled at translating complex data into actionable insights that drive strategic decision-making and business growth.`;
      }
      else if (role.toLowerCase().includes('marketing')) {
        summary = `Strategic ${role} with ${experiences.length > 0 ? 'proven track record' : 'strong skills'} in brand development and campaign management. Expertise in ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? ', and more' : ''}. Adept at leveraging market trends and consumer insights to create compelling campaigns that drive engagement and conversion.`;
      }
      else {
        summary = `Dedicated ${role} with ${experiences.length > 0 ? 'valuable experience' : 'strong capabilities'} in ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? ', and more' : ''}. Committed to excellence and continuous improvement, with a proven ability to adapt to changing environments and deliver high-quality results.`;
      }
      
      return summary;
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  }
  
  /**
   * Generate a role-specific professional summary using templates and AI
   */
  async generateRoleSpecificSummary({ 
    role, 
    skills = [], 
    experiences = [], 
    yearsOfExperience = 0 
  }: GenerateSummaryParams): Promise<string> {
    try {
      console.log('Generating role-specific summary for:', role);
      console.log('Years of experience:', yearsOfExperience);
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the role template utility to generate a tailored prompt
      const prompt = generateSummaryPrompt(role, skills, experiences, yearsOfExperience);
      console.log('Generated prompt:', prompt);
      
      // In a real implementation, we would send this prompt to the Gemini API
      // For now, we'll use our template-based approach
      const template = findRoleTemplate(role);
      
      // Generate a summary based on the template
      let summary = '';
      const skillsText = skills.length > 0 ? skills.slice(0, 3).join(', ') : template.focusAreas.slice(0, 2).join(', ');
      const experienceLevel = yearsOfExperience > 5 ? 'seasoned' : 
                             yearsOfExperience > 2 ? 'experienced' : 
                             experiences.length > 0 ? 'qualified' : 'motivated';
      
      // Use template keywords for more varied and role-specific language
      const actionVerb = template.keywords[Math.floor(Math.random() * template.keywords.length)];
      const focusArea = template.focusAreas[Math.floor(Math.random() * template.focusAreas.length)];
      
      summary = `${experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} ${template.title} with ${yearsOfExperience > 0 ? `${yearsOfExperience}+ years of` : 'demonstrated'} expertise in ${skillsText}. Proven ability to ${actionVerb} ${focusArea} with a focus on delivering exceptional results. Combines strong ${template.softSkills.slice(0, 2).join(' and ')} with deep knowledge of ${template.industrySkills.slice(0, 2).join(' and ')} to drive success.`;
      
      return summary;
    } catch (error) {
      console.error('Error generating role-specific summary:', error);
      throw error;
    }
  }
  
  /**
   * Suggest skills based on the applicant's role
   */
  async suggestSkillsForRole(role: string): Promise<{
    technicalSkills: string[];
    softSkills: string[];
    industrySkills: string[];
  }> {
    try {
      console.log('Suggesting skills for role:', role);
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the role template utility to get role-specific skills
      const skills = getRoleSkills(role);
      
      // In a real implementation, we might enhance this with the Gemini API
      // For now, we'll use our predefined skills from the templates
      
      // Randomize the order a bit to make it feel more dynamic
      const shuffleArray = (array: string[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      
      return {
        technicalSkills: shuffleArray(skills.technicalSkills).slice(0, 15),
        softSkills: shuffleArray(skills.softSkills).slice(0, 10),
        industrySkills: shuffleArray(skills.industrySkills).slice(0, 12)
      };
    } catch (error) {
      console.error('Error suggesting skills:', error);
      throw error;
    }
  }
  
  /**
   * Improve text with grammar and content enhancement
   */
  async improveText(text: string, context: TextContext, keywords?: string[]): Promise<string> {
    try {
      console.log(`Improving ${context} text:`, text);
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the grammar checker utility to generate a prompt
      const prompt = generateGrammarPrompt(text, context);
      console.log('Generated prompt:', prompt);
      
      // In a real implementation, we would send this prompt to the Gemini API
      // For now, we'll use some predefined improvements based on the context
      
      // If the text is very short, return an example improvement
      if (text.length < 20) {
        const example = getExampleImprovement(context);
        return example.after;
      }
      
      // Otherwise, make some basic improvements
      let improvedText = text;
      
      // If it's a project description and we have keywords, incorporate them
      if (context === 'project' && keywords && keywords.length > 0) {
        return this.improveProjectDescription(text, keywords);
      }
      
      // Replace passive voice patterns
      improvedText = improvedText.replace(/was (\w+ed)/g, (match, verb) => {
        // Convert to active voice with a common action verb
        const actionVerbs = ['implemented', 'developed', 'created', 'designed', 'managed', 'led', 'executed', 'delivered'];
        return actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      });
      
      // Replace weak verbs
      const weakVerbReplacements: Record<string, string[]> = {
        'worked on': ['developed', 'implemented', 'engineered', 'created', 'built'],
        'helped with': ['facilitated', 'contributed to', 'supported', 'collaborated on'],
        'was responsible for': ['managed', 'led', 'directed', 'oversaw', 'coordinated'],
        'made': ['created', 'developed', 'produced', 'designed', 'built'],
        'did': ['executed', 'performed', 'accomplished', 'conducted', 'completed'],
        'got': ['achieved', 'attained', 'secured', 'obtained', 'acquired']
      };
      
      Object.entries(weakVerbReplacements).forEach(([weakVerb, replacements]) => {
        const replacement = replacements[Math.floor(Math.random() * replacements.length)];
        improvedText = improvedText.replace(new RegExp(weakVerb, 'gi'), replacement);
      });
      
      // Add context-specific enhancements
      if (context === 'summary') {
        // Ensure it starts with a strong opening
        if (!/(experienced|skilled|accomplished|innovative|results-driven|dedicated|passionate|detail-oriented|creative)/i.test(improvedText.split(' ').slice(0, 3).join(' '))) {
          const openings = ['Experienced', 'Skilled', 'Accomplished', 'Innovative', 'Results-driven', 'Dedicated', 'Passionate'];
          improvedText = `${openings[Math.floor(Math.random() * openings.length)]} professional ${improvedText.charAt(0).toLowerCase() + improvedText.slice(1)}`;
        }
      } else if (context === 'experience') {
        // Ensure it starts with an action verb if it doesn't already
        if (!/^\w+ed\b|^\w+ing\b/i.test(improvedText)) {
          const actionVerbs = ['Developed', 'Implemented', 'Led', 'Managed', 'Created', 'Designed', 'Executed', 'Delivered'];
          improvedText = `${actionVerbs[Math.floor(Math.random() * actionVerbs.length)]} ${improvedText.charAt(0).toLowerCase() + improvedText.slice(1)}`;
        }
      }
      
      return improvedText;
    } catch (error) {
      console.error('Error improving text:', error);
      throw error;
    }
  }

  /**
   * Suggest a job description based on the job title
   */
  async suggestJobDescription(jobTitle: string, company?: string): Promise<string> {
    try {
      console.log('Suggesting job description for:', jobTitle);
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, we would send this to the Gemini API
      // For now, we'll use template-based responses
      const template = findRoleTemplate(jobTitle);
      const companyName = company || 'the company';
      
      // Generate a description based on the template and job title
      let description = '';
      
      // Use template keywords for more varied and role-specific language
      const actionVerbs = template.keywords.slice(0, 3);
      const focusAreas = template.focusAreas.slice(0, 3);
      const techSkills = template.technicalSkills.slice(0, 4);
      const industrySkills = template.industrySkills.slice(0, 3);
      
      // Create bullet points for responsibilities
      const responsibilities = [
        `${actionVerbs[0].charAt(0).toUpperCase() + actionVerbs[0].slice(1)} ${focusAreas[0]} using ${techSkills.slice(0, 2).join(' and ')}.`,
        `Collaborated with cross-functional teams to ${actionVerbs[1]} ${focusAreas[1]}.`,
        `${actionVerbs[2].charAt(0).toUpperCase() + actionVerbs[2].slice(1)} ${industrySkills[0]} solutions that improved efficiency by 30%.`,
        `Managed project timelines and resources to ensure on-time delivery of high-quality products.`,
        `Conducted regular code reviews and implemented best practices for ${techSkills[2]}.`
      ];
      
      // Randomize and select 3-4 responsibilities
      const shuffleArray = (array: string[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      
      const selectedResponsibilities = shuffleArray(responsibilities).slice(0, 3 + Math.floor(Math.random() * 2));
      description = selectedResponsibilities.join('\n• ');
      
      // Add bullet point to the first item if it doesn't start with one
      if (!description.startsWith('•')) {
        description = '• ' + description;
      }
      
      return description;
    } catch (error) {
      console.error('Error suggesting job description:', error);
      throw error;
    }
  }

  /**
   * Suggest a project description and technologies based on the project title
   */
  /**
   * Specifically improve project descriptions by incorporating relevant keywords
   * @param text The original project description
   * @param keywords Keywords to incorporate into the improved description
   * @returns Enhanced project description with keywords
   */
  private improveProjectDescription(text: string, keywords: string[]): string {
    // Extract the core message from the text
    const originalText = text.trim();
    
    // Determine if the text already contains strong action verbs
    const hasStrongVerbs = /(developed|created|built|designed|implemented|architected|engineered|constructed)/i.test(originalText);
    
    // Start with a strong action verb if none exists
    let improvedText = originalText;
    if (!hasStrongVerbs) {
      const actionVerbs = ['Developed', 'Created', 'Built', 'Designed', 'Implemented', 'Architected'];
      improvedText = `${actionVerbs[Math.floor(Math.random() * actionVerbs.length)]} ${improvedText.charAt(0).toLowerCase() + improvedText.slice(1)}`;
    }
    
    // Check if the description mentions technologies or methodologies
    const mentionsTech = keywords.some(keyword => originalText.toLowerCase().includes(keyword.toLowerCase()));
    
    // If no technologies are mentioned, incorporate some keywords
    if (!mentionsTech && keywords.length > 0) {
      // Select 2-3 keywords to incorporate
      const selectedKeywords = keywords.slice(0, Math.min(3, keywords.length));
      
      // Add technologies used
      if (improvedText.endsWith('.')) {
        improvedText = improvedText.slice(0, -1);
      }
      
      improvedText += ` utilizing ${selectedKeywords.slice(0, -1).join(', ')}${selectedKeywords.length > 1 ? ' and ' : ''}${selectedKeywords[selectedKeywords.length - 1]}.`;
    }
    
    // Check if the description mentions impact or results
    const mentionsImpact = /(improved|increased|reduced|enhanced|optimized|boosted|achieved|resulted)/i.test(originalText);
    
    // Add impact statement if none exists
    if (!mentionsImpact) {
      const impactStatements = [
        'Improved user experience and engagement.',
        'Resulted in 30% faster performance.',
        'Enhanced productivity and workflow efficiency.',
        'Reduced development time by 25%.',
        'Optimized resource utilization and system performance.'
      ];
      
      improvedText += ` ${impactStatements[Math.floor(Math.random() * impactStatements.length)]}`;
    }
    
    return improvedText;
  }

  async suggestProjectDetails(projectTitle: string): Promise<{ description: string; technologies: string[] }> {
    try {
      console.log('Suggesting project details for:', projectTitle);
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract keywords from the project title to determine the type of project
      const titleLower = projectTitle.toLowerCase();
      
      // Define project types and their associated technologies and description templates
      const projectTypes: Record<string, { techs: string[], templates: string[] }> = {
        'e-commerce': {
          techs: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe API', 'AWS S3', 'Firebase'],
          templates: [
            'Developed a full-stack e-commerce platform with secure payment processing and inventory management.',
            'Built a responsive online store with user authentication, product search, and order tracking features.',
            'Created a scalable marketplace application with vendor management and analytics dashboard.'
          ]
        },
        'portfolio': {
          techs: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Three.js', 'GSAP'],
          templates: [
            'Designed and implemented a modern portfolio website showcasing projects with interactive animations.',
            'Built a responsive personal portfolio with dark/light mode and optimized performance metrics.',
            'Created a minimalist portfolio site with project filtering and contact form functionality.'
          ]
        },
        'mobile': {
          techs: ['React Native', 'Flutter', 'Firebase', 'Redux', 'GraphQL', 'SQLite', 'Push Notifications'],
          templates: [
            'Developed a cross-platform mobile application with offline-first functionality and real-time updates.',
            'Built a native mobile app with location-based services and social media integration.',
            'Created a performant mobile application with custom animations and state management.'
          ]
        },
        'dashboard': {
          techs: ['React', 'D3.js', 'Material UI', 'Redux', 'Chart.js', 'REST API', 'Firebase'],
          templates: [
            'Designed and implemented an analytics dashboard with interactive data visualizations and filtering capabilities.',
            'Built a real-time monitoring dashboard with customizable widgets and user permission management.',
            'Created an admin dashboard with comprehensive reporting features and data export functionality.'
          ]
        },
        'ai': {
          techs: ['Python', 'TensorFlow', 'PyTorch', 'Flask', 'scikit-learn', 'NLTK', 'OpenAI API'],
          templates: [
            'Developed a machine learning application that analyzes user data to provide personalized recommendations.',
            'Built an AI-powered tool that automates content generation and optimization processes.',
            'Created a natural language processing system for sentiment analysis and text classification.'
          ]
        },
        'game': {
          techs: ['Unity', 'C#', 'JavaScript', 'Three.js', 'WebGL', 'Phaser', 'Socket.io'],
          templates: [
            'Designed and developed a browser-based game with multiplayer functionality and leaderboard system.',
            'Built an interactive gaming experience with physics-based mechanics and progressive difficulty levels.',
            'Created a casual mobile game with monetization features and social sharing capabilities.'
          ]
        },
        'social': {
          techs: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redux', 'AWS', 'Firebase'],
          templates: [
            'Developed a social networking platform with real-time messaging and content sharing features.',
            'Built a community-based application with user profiles, following system, and activity feeds.',
            'Created a media sharing platform with content moderation and recommendation algorithms.'
          ]
        }
      };
      
      // Default project type if no specific match is found
      let projectType = 'web';
      const webProject = {
        techs: ['React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Express', 'MongoDB', 'REST API'],
        templates: [
          'Developed a responsive web application with user authentication and data persistence.',
          'Built a modern web platform that streamlines user workflows and improves productivity.',
          'Created a scalable web solution that addresses specific business requirements and enhances user experience.'
        ]
      };
      
      // Determine project type based on title keywords
      for (const type in projectTypes) {
        if (titleLower.includes(type) || 
            (type === 'e-commerce' && (titleLower.includes('shop') || titleLower.includes('store'))) ||
            (type === 'mobile' && (titleLower.includes('app') || titleLower.includes('ios') || titleLower.includes('android'))) ||
            (type === 'dashboard' && (titleLower.includes('admin') || titleLower.includes('analytics'))) ||
            (type === 'ai' && (titleLower.includes('machine learning') || titleLower.includes('ml') || titleLower.includes('intelligent'))) ||
            (type === 'social' && (titleLower.includes('network') || titleLower.includes('community')))) {
          projectType = type;
          break;
        }
      }
      
      // Get the appropriate technologies and templates
      const { techs, templates } = projectType in projectTypes ? projectTypes[projectType] : webProject;
      
      // Select a random template and 3-6 technologies
      const description = templates[Math.floor(Math.random() * templates.length)];
      
      // Shuffle and select technologies
      const shuffleArray = (array: string[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      
      const technologies = shuffleArray(techs).slice(0, 3 + Math.floor(Math.random() * 4));
      
      return { description, technologies };
    } catch (error) {
      console.error('Error suggesting project details:', error);
      throw error;
    }
  }
}
