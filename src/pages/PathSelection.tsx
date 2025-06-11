
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Code, Briefcase } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useResume } from "@/contexts/ResumeContext";
import Header from "@/components/Header";

const PathSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCareerPath } = useResume();
  const [selectedPath, setSelectedPath] = useState<'technical' | 'non-technical' | null>(null);

  const handleContinue = () => {
    if (!selectedPath) {
      toast({
        title: "No path selected",
        description: "Please select a career path to continue.",
        variant: "destructive",
      });
      return;
    }

    setCareerPath(selectedPath);
    
    if (selectedPath === 'technical') {
      navigate('/experience-selection');
    } else {
      navigate('/templates');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-6">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <Link to="/" className="text-resume-purple hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Career Path</h1>
            <p className="text-lg text-gray-600">
              We'll customize your resume experience based on your career path.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`cursor-pointer transition-all border-2 hover:shadow-md ${
                selectedPath === 'technical' 
                  ? 'border-resume-purple/70 shadow-md' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedPath('technical')}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-resume-light-purple rounded-full flex items-center justify-center mb-4">
                  <Code size={32} className="text-resume-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Technical Path</h3>
                <p className="text-gray-600 mb-4">
                  For developers, engineers, data scientists, IT professionals, and other technical roles.
                </p>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Technical skill emphasis
                  </li>
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Project showcase sections
                  </li>
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    GitHub and portfolio integration
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all border-2 hover:shadow-md ${
                selectedPath === 'non-technical' 
                  ? 'border-resume-purple/70 shadow-md' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedPath('non-technical')}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-resume-light-blue rounded-full flex items-center justify-center mb-4">
                  <Briefcase size={32} className="text-resume-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Non-Technical Path</h3>
                <p className="text-gray-600 mb-4">
                  For business, creative, healthcare, education, service, and other non-technical roles.
                </p>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Achievement-focused format
                  </li>
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Industry-specific templates
                  </li>
                  <li className="flex items-center">
                    <span className="text-resume-green mr-2">✓</span> 
                    Soft skill highlighting
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

export default PathSelection;
