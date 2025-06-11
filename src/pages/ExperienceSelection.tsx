
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useResume } from "@/contexts/ResumeContext";
import Header from "@/components/Header";

const ExperienceSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { careerPath, setExperienceLevel } = useResume();
  const [selectedLevel, setSelectedLevel] = useState<'fresher' | 'experienced' | null>(null);

  // Redirect if career path is not set
  if (!careerPath || careerPath !== 'technical') {
    navigate('/path-selection');
  }

  const handleContinue = () => {
    if (!selectedLevel) {
      toast({
        title: "No experience level selected",
        description: "Please select your experience level to continue.",
        variant: "destructive",
      });
      return;
    }

    setExperienceLevel(selectedLevel);
    navigate('/templates');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-6">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <Link to="/path-selection" className="text-resume-purple hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Path Selection
            </Link>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Select Your Experience Level</h1>
            <p className="text-lg text-gray-600">
              We'll tailor your resume template based on your professional experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`cursor-pointer transition-all border-2 hover:shadow-md ${
                selectedLevel === 'fresher' 
                  ? 'border-resume-purple/70 shadow-md' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedLevel('fresher')}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-resume-light-green rounded-full flex items-center justify-center mb-4">
                  <Sparkles size={32} className="text-resume-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fresher</h3>
                <p className="text-gray-600 mb-4">
                  For those with less than 2 years of professional experience or recent graduates.
                </p>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Education & skills emphasis
                  </li>
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Projects showcase
                  </li>
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Internship highlighting
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all border-2 hover:shadow-md ${
                selectedLevel === 'experienced' 
                  ? 'border-resume-purple/70 shadow-md' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedLevel('experienced')}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-resume-light-blue rounded-full flex items-center justify-center mb-4">
                  <Star size={32} className="text-resume-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Experienced</h3>
                <p className="text-gray-600 mb-4">
                  For professionals with 2+ years of work experience in technical roles.
                </p>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Work experience emphasis
                  </li>
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Career achievements focus
                  </li>
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Professional growth showcase
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button 
              onClick={handleContinue}
              className="bg-resume-purple hover:bg-resume-purple/90 text-white px-8"
              size="lg"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExperienceSelection;
