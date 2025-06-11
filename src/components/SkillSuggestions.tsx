import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Wand2, X } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { useResume } from '@/contexts/ResumeContext';

interface SkillSuggestionProps {
  role: string;
  onClose: () => void;
  onAddSkills: (skills: string[]) => void;
}

const SkillSuggestions = ({ role, onClose, onAddSkills }: SkillSuggestionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    technicalSkills: string[];
    softSkills: string[];
    industrySkills: string[];
  }>({ technicalSkills: [], softSkills: [], industrySkills: [] });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('technical');
  const { resumeData } = useResume();
  const aiService = new AIService();

  // Get existing skills to avoid suggesting duplicates
  const existingSkills = resumeData.skills.map(skill => skill.name.toLowerCase());

  useEffect(() => {
    loadSkillSuggestions();
  }, [role]);

  const loadSkillSuggestions = async () => {
    try {
      setIsLoading(true);
      const suggestedSkills = await aiService.suggestSkillsForRole(role);
      
      // Filter out skills that already exist in the resume
      const filteredSuggestions = {
        technicalSkills: suggestedSkills.technicalSkills.filter(
          skill => !existingSkills.includes(skill.toLowerCase())
        ),
        softSkills: suggestedSkills.softSkills.filter(
          skill => !existingSkills.includes(skill.toLowerCase())
        ),
        industrySkills: suggestedSkills.industrySkills.filter(
          skill => !existingSkills.includes(skill.toLowerCase())
        )
      };
      
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error('Error loading skill suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  };

  const handleAddSelectedSkills = () => {
    onAddSkills(selectedSkills);
    onClose();
  };

  const getSkillsForActiveTab = () => {
    switch (activeTab) {
      case 'technical':
        return suggestions.technicalSkills;
      case 'soft':
        return suggestions.softSkills;
      case 'industry':
        return suggestions.industrySkills;
      default:
        return [];
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>AI Skill Suggestions</CardTitle>
            <CardDescription>
              Suggested skills for {role}. Select skills to add to your resume.
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin mr-2">
              <Wand2 className="h-5 w-5" />
            </div>
            <p>Generating skill suggestions...</p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="technical" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="technical">
                  Technical Skills
                  <Badge variant="secondary" className="ml-2">
                    {suggestions.technicalSkills.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="soft">
                  Soft Skills
                  <Badge variant="secondary" className="ml-2">
                    {suggestions.softSkills.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="industry">
                  Industry Skills
                  <Badge variant="secondary" className="ml-2">
                    {suggestions.industrySkills.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
                {getSkillsForActiveTab().length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {getSkillsForActiveTab().map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="text-sm cursor-pointer"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No {activeTab} skills available for suggestion.
                  </p>
                )}
              </div>
            </Tabs>

            {selectedSkills.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Selected Skills ({selectedSkills.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="flex items-center gap-1">
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleSkillToggle(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleAddSelectedSkills}
          disabled={selectedSkills.length === 0 || isLoading}
        >
          Add {selectedSkills.length} Skills
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SkillSuggestions;
