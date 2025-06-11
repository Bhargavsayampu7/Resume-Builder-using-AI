/**
 * Utility for grammar and content improvement using AI
 */

// Context types for different sections of the resume
export type TextContext = 'summary' | 'experience' | 'education' | 'skill' | 'project' | 'certification';

/**
 * Generate a prompt for improving text based on the context
 */
export function generateGrammarPrompt(text: string, context: TextContext): string {
  // Base instructions that apply to all contexts
  let prompt = `Improve the following ${context} text for a professional resume. `;
  prompt += 'Fix grammar, spelling, punctuation, and sentence structure. ';
  prompt += 'Use active voice, professional language, and impactful action verbs. ';
  prompt += 'Maintain the original meaning and information, but make it more concise and professional. ';
  
  // Add context-specific instructions
  switch (context) {
    case 'summary':
      prompt += 'Focus on highlighting key strengths, career goals, and unique value proposition. ';
      prompt += 'Avoid clichés and generic phrases. Keep it to 2-3 impactful sentences. ';
      break;
      
    case 'experience':
      prompt += 'Begin each bullet point or sentence with a strong action verb. ';
      prompt += 'Focus on achievements and impact rather than just responsibilities. ';
      prompt += 'Include measurable results where possible (numbers, percentages, etc.). ';
      break;
      
    case 'education':
      prompt += 'Keep it concise and focused on relevant academic achievements. ';
      prompt += 'Use standard formatting for degree names and institutions. ';
      break;
      
    case 'skill':
      prompt += 'Use industry-standard terminology for skills. ';
      prompt += 'Be specific rather than general. ';
      break;
      
    case 'project':
      prompt += 'Highlight the purpose, technologies used, and outcomes of the project. ';
      prompt += 'Focus on your specific contribution and the impact of the project. ';
      break;
      
    case 'certification':
      prompt += 'Use the official name of the certification. ';
      prompt += 'Include relevant details like issuing organization and date if mentioned. ';
      break;
  }
  
  prompt += 'Here is the text to improve: "' + text + '"';
  
  return prompt;
}

/**
 * Generate guidelines for text improvement based on context
 */
export function getImprovementGuidelines(context: TextContext): string[] {
  const commonGuidelines = [
    'Use active voice instead of passive voice',
    'Replace weak verbs with strong action verbs',
    'Remove unnecessary words and phrases',
    'Fix grammar and spelling errors',
    'Ensure proper punctuation'
  ];
  
  const contextSpecificGuidelines: Record<TextContext, string[]> = {
    summary: [
      'Highlight your unique value proposition',
      'Focus on career goals and strengths',
      'Keep it concise (2-3 sentences)',
      'Avoid clichés and generic phrases',
      'Tailor it to the target role'
    ],
    experience: [
      'Begin with strong action verbs',
      'Focus on achievements rather than responsibilities',
      'Include measurable results (numbers, percentages)',
      'Show impact and contributions',
      'Use industry-relevant keywords'
    ],
    education: [
      'Use standard formatting for degrees and institutions',
      'Include relevant academic achievements',
      'Be consistent in date formatting',
      'List most recent education first',
      'Include GPA only if it strengthens your application'
    ],
    skill: [
      'Use industry-standard terminology',
      'Be specific rather than general',
      'Group related skills together',
      'Prioritize skills relevant to the target role',
      'Include proficiency level if appropriate'
    ],
    project: [
      'Clearly state the purpose of the project',
      'Highlight technologies and methodologies used',
      'Describe your specific role and contributions',
      'Mention outcomes and impact',
      'Keep descriptions concise and focused'
    ],
    certification: [
      'Use the official certification name',
      'Include the issuing organization',
      'Mention date of certification if recent',
      'Include expiration date if relevant',
      'List certifications in order of relevance'
    ]
  };
  
  return [...commonGuidelines, ...contextSpecificGuidelines[context]];
}

/**
 * Example improvements for different contexts
 */
export function getExampleImprovement(context: TextContext): { before: string; after: string } {
  const examples: Record<TextContext, { before: string; after: string }> = {
    summary: {
      before: 'I am a hard-working professional with good communication skills and a team player mentality. I have 5 years of experience in the industry and am looking for new opportunities.',
      after: 'Results-driven professional with 5 years of industry experience, known for exceptional communication and collaborative leadership. Seeking to leverage proven expertise in driving strategic initiatives and team success in a challenging new role.'
    },
    experience: {
      before: 'I was responsible for managing a team of 5 people and we worked on various projects. I had to ensure deadlines were met and quality was maintained.',
      after: 'Led a cross-functional team of 5 professionals, delivering 12+ high-impact projects on time and under budget. Implemented quality assurance protocols that improved deliverable standards by 30% while reducing revision cycles.'
    },
    education: {
      before: 'I got my bachelor degree from University of California in 2018. My major was computer science.',
      after: 'Bachelor of Science in Computer Science, University of California, Berkeley (2018)'
    },
    skill: {
      before: 'Good with computers, know programming, can use Microsoft Office, good at problem solving',
      after: 'Python, Java, React.js, SQL, AWS Cloud Services, Data Analysis, UI/UX Design, Agile Methodology'
    },
    project: {
      before: 'Worked on a website project that used React. It was for a client and we finished it on time.',
      after: 'Developed a responsive e-commerce platform using React.js and Node.js, implementing secure payment processing that increased client conversion rates by 25%. Delivered two weeks ahead of schedule, enabling early market entry.'
    },
    certification: {
      before: 'I got certified in project management last year from PMI.',
      after: 'Project Management Professional (PMP), Project Management Institute, 2022'
    }
  };
  
  return examples[context];
}
