
import React, { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileSearch, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ATSScoreChecker = () => {
  const { resumeData } = useResume();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{category: string, score: number, feedback: string}[]>([]);

  const analyzeResume = () => {
    setIsAnalyzing(true);
    
    // Simulating backend analysis with setTimeout
    setTimeout(() => {
      // Calculate basic score based on resume completeness
      const personalInfoScore = calculateSectionScore(resumeData.personalInfo);
      const experienceScore = resumeData.experiences.length > 0 ? 95 : 0;
      const educationScore = resumeData.education.length > 0 ? 85 : 0;
      const skillsScore = resumeData.skills.length > 0 ? 90 : 0;
      
      // Calculate keyword relevance based on summary
      const keywordScore = resumeData.personalInfo.summary ? 
        Math.min(75 + resumeData.personalInfo.summary.length / 20, 95) : 0;
      
      // Calculate overall score (weighted average)
      const totalScore = Math.round(
        (personalInfoScore * 0.15) + 
        (experienceScore * 0.35) + 
        (educationScore * 0.20) + 
        (skillsScore * 0.15) + 
        (keywordScore * 0.15)
      );
      
      setScore(totalScore);
      setFeedback([
        {
          category: "Contact Information",
          score: personalInfoScore,
          feedback: personalInfoScore < 70 ? 
            "Your contact information is incomplete. Make sure to add email, phone, and location." : 
            "Your contact information is well-formatted and complete."
        },
        {
          category: "Work Experience",
          score: experienceScore,
          feedback: experienceScore < 70 ? 
            "Add detailed work experience with measurable achievements and relevant keywords." :
            "Your work experience section is well-structured for ATS systems."
        },
        {
          category: "Education",
          score: educationScore,
          feedback: educationScore < 70 ?
            "Add your educational background with degree, institution, and dates." :
            "Your education section is properly formatted for ATS parsing."
        },
        {
          category: "Skills",
          score: skillsScore,
          feedback: skillsScore < 70 ?
            "Add more relevant skills using industry standard terminology." :
            "Your skills section contains good keywords that will be picked up by ATS."
        },
        {
          category: "Keyword Optimization",
          score: keywordScore,
          feedback: keywordScore < 70 ?
            "Your resume lacks important keywords. Enhance your summary with industry-specific terms." :
            "Good keyword optimization in your summary and descriptions."
        }
      ]);
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const calculateSectionScore = (section: any): number => {
    // Basic completeness check for personal info
    if (!section) return 0;
    
    const totalFields = Object.keys(section).length;
    const filledFields = Object.values(section).filter(val => val && String(val).trim() !== '').length;
    
    return Math.round((filledFields / totalFields) * 100);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">High</Badge>;
    if (score >= 60) return <Badge className="bg-amber-100 text-amber-800">Medium</Badge>;
    return <Badge className="bg-red-100 text-red-800">Low</Badge>;
  };

  return (
    <>
      <Button 
        onClick={() => {
          setIsOpen(true);
          setScore(null);
          setFeedback([]);
        }}
        variant="outline" 
        className="flex items-center gap-1"
      >
        <FileSearch className="h-4 w-4" />
        Check ATS Score
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ATS Compatibility Score</DialogTitle>
            <DialogDescription>
              Check how well your resume will perform with Applicant Tracking Systems.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-pulse">
                  <FileSearch className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Analyzing your resume...</p>
                </div>
                <Progress value={45} className="w-full h-2" />
              </div>
            ) : score === null ? (
              <div className="text-center py-8">
                <FileSearch className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Click analyze to check your resume's ATS compatibility.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center flex-col">
                  <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                  <p className="text-gray-600 mt-1">ATS Compatibility Score</p>
                </div>
                
                <div className="mt-6 space-y-3">
                  {feedback.map((item, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{item.category}</h4>
                        {getScoreBadge(item.score)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.score >= 80 ? (
                          <CheckCircle2 className="h-4 w-4 inline mr-1 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 inline mr-1 text-amber-600" />
                        )}
                        {item.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex gap-2 sm:gap-0">
            {score === null && (
              <Button 
                onClick={analyzeResume}
                disabled={isAnalyzing}
                className="bg-resume-purple hover:bg-resume-purple/90"
              >
                Analyze Resume
              </Button>
            )}
            <Button 
              onClick={() => setIsOpen(false)}
              variant={score === null ? "outline" : "default"}
            >
              {score === null ? "Cancel" : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ATSScoreChecker;
