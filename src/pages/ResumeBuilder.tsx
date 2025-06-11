import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Wand2, Pencil, File, Plus, Github, Linkedin, FileEdit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/contexts/ResumeContext";
import { AIService } from "@/services/aiService";
import { TextContext } from "@/utils/grammarChecker";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import ResumeTemplateRenderer from "@/components/templates/ResumeTemplateRenderer";
import PDFDownload from "@/components/PDFDownload";
import TemplateCustomizer from "@/components/TemplateCustomizer";
import ATSScoreChecker from "@/components/ATSScoreChecker";
import SkillSuggestions from "@/components/SkillSuggestions";
import EducationForm from "@/components/forms/EducationForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import SkillForm from "@/components/forms/SkillForm";
import ProjectForm from "@/components/forms/ProjectForm";
import CertificationForm from "@/components/forms/CertificationForm";
import LanguageForm from "@/components/forms/LanguageForm";
import InternshipForm from "@/components/forms/InternshipForm";

type FormDialogState = {
  type: 'education' | 'experience' | 'skill' | 'project' | 'certification' | 'language' | 'internship' | null;
  isOpen: boolean;
  itemId?: string;
};

const ResumeBuilder = () => {
  const aiService = new AIService();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    careerPath, 
    experienceLevel, 
    selectedTemplate, 
    resumeData, 
    updatePersonalInfo,
    templateCustomization,
    addSkill,
    removeExperience,
    removeEducation,
    removeSkill,
    removeProject,
    removeCertification,
    removeInternship,
    removeLanguage
  } = useResume();
  const [activeTab, setActiveTab] = useState('personal');
  const [formDialog, setFormDialog] = useState<FormDialogState>({ type: null, isOpen: false });

  // Redirect if no template is selected
  useEffect(() => {
    if (!selectedTemplate) {
      navigate('/templates');
    }
  }, [selectedTemplate, navigate]);
  
  if (!selectedTemplate) {
    return null;
  }

  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

  const handleAIAssist = async () => {
    try {
      setIsGeneratingSummary(true);
      
      // Extract role from the current job title or use a default
      const role = resumeData.experiences.length > 0 
        ? resumeData.experiences[0].title 
        : 'professional';
      
      // Extract skills for context
      const skills = resumeData.skills.map(skill => skill.name);
      
      // Extract experiences for context
      const experiences = resumeData.experiences.map(exp => ({
        title: exp.title,
        company: exp.company,
        description: exp.description
      }));
      
      // Generate summary using the AI service
      const summary = await aiService.generateSummary({
        role,
        skills,
        experiences
      });
      
      // Update the resume data with the generated summary
      updatePersonalInfo({ summary });
      
      toast({
        title: "AI Summary Generated",
        description: "Your professional summary has been updated based on your role and experience.",
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingSummary(false);
    }
  };
  
  const openFormDialog = (type: FormDialogState['type'], itemId?: string) => {
    setFormDialog({ type, isOpen: true, itemId });
  };
  
  const handleAISkillSuggest = () => {
    // Get the role from experiences or a default
    const role = resumeData.experiences.length > 0 
      ? resumeData.experiences[0].title 
      : 'professional';
    
    // Show the skill suggestions dialog
    setShowSkillSuggestions(true);
  };
  
  const handleImproveText = async (context: TextContext) => {
    try {
      setIsImproving(true);
      
      let text = '';
      switch (context) {
        case 'summary':
          text = resumeData.personalInfo.summary;
          break;
        case 'experience':
          // This would need to be handled differently since there are multiple experiences
          // For now, we're not implementing this
          break;
        case 'education':
          // This would need to be handled differently since there are multiple education entries
          // For now, we're not implementing this
          break;
        default:
          break;
      }
      
      if (!text) {
        toast({
          title: "Error",
          description: "No text to improve. Please add some content first.",
          variant: "destructive"
        });
        setIsImproving(false);
        return;
      }
      
      const improvedText = await aiService.improveText(text, context);
      
      // Update the appropriate field
      switch (context) {
        case 'summary':
          updatePersonalInfo({ summary: improvedText });
          break;
        // Handle other contexts as needed
        default:
          break;
      }
      
      toast({
        title: "Text Improved",
        description: "Your text has been professionally enhanced.",
      });
    } catch (error) {
      console.error('Error improving text:', error);
      toast({
        title: "Error",
        description: "Failed to improve text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsImproving(false);
    }
  };
  
  const closeFormDialog = () => {
    setFormDialog({ type: null, isOpen: false });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="flex justify-between items-center py-4 px-6 md:px-10 bg-white shadow-sm">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold gradient-text">ResumeAI</h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          <TemplateCustomizer />
          <ATSScoreChecker />
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-1"
            onClick={handleAIAssist}
          >
            <Wand2 className="h-4 w-4" />
            AI Assist
          </Button>
          <PDFDownload />
        </div>
      </header>
      
      <div className="flex-grow flex flex-col lg:flex-row p-4 md:p-8 gap-8 max-w-[1600px] mx-auto w-full">
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2">
          <div className="mb-8">
            <Link to="/templates" className="text-resume-purple hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
            <h2 className="text-2xl font-semibold mt-4">Build Your Resume</h2>
            <p className="text-gray-600">
              Fill in your details to create your professional resume.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="additional">Additional</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templateCustomization.showProfileImage && (
                      <div className="md:col-span-2 flex justify-center py-4">
                        <ProfileImageUpload 
                          currentImage={resumeData.personalInfo.profileImage}
                          onImageChange={(imageUrl) => updatePersonalInfo({ profileImage: imageUrl })}
                          onImageRemove={() => updatePersonalInfo({ profileImage: undefined })}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        autoComplete="name"
                        value={resumeData.personalInfo.name} 
                        onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                        placeholder="John Doe" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        autoComplete="email"
                        value={resumeData.personalInfo.email} 
                        onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                        placeholder="johndoe@example.com" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        autoComplete="tel"
                        value={resumeData.personalInfo.phone} 
                        onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                        placeholder="+1 (555) 123-4567" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location"
                        autoComplete="address-level1"
                        value={resumeData.personalInfo.location} 
                        onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                        placeholder="New York, NY" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="website" 
                          name="website"
                          autoComplete="url"
                          value={resumeData.personalInfo.website || ''} 
                          onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                          placeholder="yourwebsite.com" 
                          className="flex-grow"
                        />
                        {resumeData.personalInfo.website && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => updatePersonalInfo({ website: undefined })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 flex flex-col">
                      <Label htmlFor="github" className="flex items-center gap-1">
                        <Github className="h-4 w-4" /> GitHub
                      </Label>
                      <div className="flex gap-2">
                        <Input 
                          id="github" 
                          name="github"
                          autoComplete="url"
                          value={resumeData.personalInfo.github || ''} 
                          onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                          placeholder="github.com/johndoe" 
                          className="flex-grow"
                        />
                        {resumeData.personalInfo.github && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => updatePersonalInfo({ github: undefined })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 flex flex-col">
                      <Label htmlFor="linkedin" className="flex items-center gap-1">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </Label>
                      <div className="flex gap-2">
                        <Input 
                          id="linkedin" 
                          name="linkedin"
                          autoComplete="url"
                          value={resumeData.personalInfo.linkedin || ''} 
                          onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                          placeholder="linkedin.com/in/johndoe" 
                          className="flex-grow"
                        />
                        {resumeData.personalInfo.linkedin && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => updatePersonalInfo({ linkedin: undefined })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-resume-purple h-6 px-2"
                            onClick={() => handleAIAssist()}
                            disabled={isGeneratingSummary || isImproving}
                          >
                            {isGeneratingSummary ? (
                              <>
                                <span className="animate-spin h-3 w-3 mr-1">⏳</span>
                                Generating...
                              </>
                            ) : (
                              <>
                                <Wand2 className="h-3 w-3 mr-1" />
                                AI Suggest
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-resume-purple h-6 px-2"
                            onClick={() => handleImproveText('summary')}
                            disabled={isImproving || isGeneratingSummary || !resumeData.personalInfo.summary}
                          >
                            {isImproving ? (
                              <>
                                <span className="animate-spin h-3 w-3 mr-1">⏳</span>
                                Improving...
                              </>
                            ) : (
                              <>
                                <FileEdit className="h-3 w-3 mr-1" />
                                AI Improve
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <Textarea 
                        id="summary" 
                        name="summary"
                        value={resumeData.personalInfo.summary} 
                        onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                        placeholder={
                          careerPath === 'technical' 
                          ? "A passionate software developer with experience in building web applications..."
                          : careerPath === 'non-technical' && experienceLevel === 'fresher'
                          ? "A recent graduate eager to contribute skills in customer service..."
                          : "A seasoned professional with expertise in business management..."
                        } 
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-gray-500">All fields with * are required</p>
                  <Button 
                    onClick={() => setActiveTab('experience')}
                    className="bg-resume-purple hover:bg-resume-purple/90"
                  >
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Work Experience</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => openFormDialog('experience')}
                    >
                      <Plus className="h-4 w-4" />
                      Add Experience
                    </Button>
                  </div>
                  
                  {resumeData.experiences.length > 0 ? (
                    <div className="space-y-4">
                      {resumeData.experiences.map((experience) => (
                        <div 
                          key={experience.id} 
                          className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer relative group"
                        >
                          <div 
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2"
                          >
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                openFormDialog('experience', experience.id);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeExperience(experience.id);
                                toast({
                                  title: "Experience Deleted",
                                  description: "The experience has been removed from your resume."
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div 
                            onClick={() => openFormDialog('experience', experience.id)}
                            className="cursor-pointer"
                          >
                            <div className="flex justify-between pr-16">
                              <h4 className="font-medium">{experience.title}</h4>
                              <span className="text-sm text-gray-500">
                                {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                              </span>
                            </div>
                            <p className="text-gray-600">{experience.company}, {experience.location}</p>
                            {experience.description && (
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{experience.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <File className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                      <p>No work experience added yet.</p>
                      <p className="text-sm">Click the button above to add your work history.</p>
                    </div>
                  )}
                  
                  {experienceLevel === 'fresher' && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium">Internships</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => openFormDialog('internship')}
                        >
                          <Plus className="h-4 w-4" />
                          Add Internship
                        </Button>
                      </div>
                      
                      {resumeData.internships.length > 0 ? (
                        <div className="space-y-4">
                          {resumeData.internships.map((internship) => (
                            <div 
                              key={internship.id} 
                              className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer relative group"
                            >
                              <div 
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2"
                              >
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openFormDialog('internship', internship.id);
                                  }}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeInternship(internship.id);
                                    toast({
                                      title: "Internship Deleted",
                                      description: "The internship has been removed from your resume."
                                    });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div 
                                onClick={() => openFormDialog('internship', internship.id)}
                                className="cursor-pointer"
                              >
                                <div className="flex justify-between pr-16">
                                  <h4 className="font-medium">{internship.title}</h4>
                                  <span className="text-sm text-gray-500">
                                    {internship.startDate} - {internship.endDate}
                                  </span>
                                </div>
                                <p className="text-gray-600">{internship.company}, {internship.location}</p>
                                {internship.description && (
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{internship.description}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          <File className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                          <p>No internships added yet.</p>
                          <p className="text-sm">Click the button above to add your internship experience.</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('personal')}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('education')}
                    className="bg-resume-purple hover:bg-resume-purple/90"
                  >
                    Next
                  </Button>
                </CardFooter>
              </Card>

              {/* Experience Form Dialog */}
              {formDialog.type === 'experience' && (
                <ExperienceForm 
                  isOpen={formDialog.isOpen} 
                  onClose={closeFormDialog} 
                  experienceId={formDialog.itemId}
                />
              )}

              {/* Internship Form Dialog */}
              {formDialog.type === 'internship' && (
                <InternshipForm 
                  isOpen={formDialog.isOpen} 
                  onClose={closeFormDialog} 
                  internshipId={formDialog.itemId}
                />
              )}
            </TabsContent>
            
            <TabsContent value="education">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Education</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => openFormDialog('education')}
                    >
                      <Plus className="h-4 w-4" />
                      Add Education
                    </Button>
                  </div>
                  
                  {resumeData.education.length > 0 ? (
                    <div className="space-y-4">
                      {resumeData.education.map((education) => (
                        <div 
                          key={education.id} 
                          className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer relative group"
                        >
                          <div 
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2"
                          >
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                openFormDialog('education', education.id);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeEducation(education.id);
                                toast({
                                  title: "Education Deleted",
                                  description: "The education entry has been removed from your resume."
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div 
                            onClick={() => openFormDialog('education', education.id)}
                            className="cursor-pointer"
                          >
                            <div className="flex justify-between pr-16">
                              <h4 className="font-medium">{education.degree}</h4>
                              <span className="text-sm text-gray-500">
                                {education.startDate} - {education.endDate}
                              </span>
                            </div>
                            <p className="text-gray-600">{education.institution}, {education.location}</p>
                            {education.description && (
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{education.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <File className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                      <p>No education added yet.</p>
                      <p className="text-sm">Click the button above to add your educational background.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('experience')}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('skills')}
                    className="bg-resume-purple hover:bg-resume-purple/90"
                  >
                    Next
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Education Form Dialog */}
              {formDialog.type === 'education' && (
                <EducationForm 
                  isOpen={formDialog.isOpen} 
                  onClose={closeFormDialog} 
                  educationId={formDialog.itemId}
                />
              )}
            </TabsContent>
            
            <TabsContent value="skills">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Skills</h3>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-resume-purple h-8 px-2 gap-1"
                        onClick={handleAISkillSuggest}
                        disabled={resumeData.experiences.length === 0}
                      >
                        <Wand2 className="h-3 w-3" />
                        AI Suggest Skills
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => openFormDialog('skill')}
                      >
                        <Plus className="h-4 w-4" />
                        Add Skill
                      </Button>
                    </div>
                  </div>
                  
                  {resumeData.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <div 
                          key={skill.id} 
                          className="bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 cursor-pointer flex items-center gap-1 group relative"
                        >
                          <span onClick={() => openFormDialog('skill', skill.id)}>
                            {skill.name}
                            {skill.level && (
                              <span className="text-xs text-gray-500 ml-1">
                                ({skill.level}/5)
                              </span>
                            )}
                          </span>
                          <button
                            className="ml-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSkill(skill.id);
                              toast({
                                title: "Skill Deleted",
                                description: "The skill has been removed from your resume."
                              });
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <File className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                      <p>No skills added yet.</p>
                      <p className="text-sm">Click the button above to add your skills.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('education')}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('additional')}
                    className="bg-resume-purple hover:bg-resume-purple/90"
                  >
                    Next
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Skill Form Dialog */}
              {formDialog.type === 'skill' && (
                <SkillForm 
                  isOpen={formDialog.isOpen} 
                  onClose={closeFormDialog} 
                  skillId={formDialog.itemId}
                />
              )}
            </TabsContent>
            
            <TabsContent value="additional">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Projects Section - Show for technical roles or if projects exist */}
                    {(careerPath === 'technical' || resumeData.projects.length > 0) && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">Projects</h3>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => openFormDialog('project')}
                          >
                            <Plus className="h-4 w-4" />
                            Add Project
                          </Button>
                        </div>
                        
                        {resumeData.projects.length > 0 ? (
                          <div className="space-y-4">
                            {resumeData.projects.map((project) => (
                              <div 
                                key={project.id} 
                                className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer relative group"
                              >
                                <div 
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2"
                                >
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openFormDialog('project', project.id);
                                    }}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeProject(project.id);
                                      toast({
                                        title: "Project Deleted",
                                        description: "The project has been removed from your resume."
                                      });
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div
                                  onClick={() => openFormDialog('project', project.id)}
                                  className="cursor-pointer"
                                >
                                  <div className="flex justify-between items-center pr-16">
                                    <h4 className="font-medium">{project.name}</h4>
                                    {project.link && (
                                      <a 
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-resume-purple underline"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        View Project
                                      </a>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                                  {project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {project.technologies.map((tech, i) => (
                                        <span key={i} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-gray-500 py-8 border border-dashed rounded-md">
                            <File className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                            <p>No projects added yet.</p>
                            <p className="text-sm">Click the button above to add your projects.</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Certifications - Show for all roles */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Certifications</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => openFormDialog('certification')}
                        >
                          <Plus className="h-4 w-4" />
                          Add Certification
                        </Button>
                      </div>
                      
                      {resumeData.certifications.length > 0 ? (
                        <div className="space-y-4">
                          {resumeData.certifications.map((cert) => (
                            <div key={cert.id} className="flex items-start justify-between p-4 border rounded-lg relative group">
                              <div>
                                <h4 className="font-medium">{cert.name}</h4>
                                <p className="text-sm text-gray-600">{cert.issuer}</p>
                                <p className="text-sm text-gray-500">{cert.date}</p>
                                {cert.credentialID && (
                                  <p className="text-sm text-gray-500">ID: {cert.credentialID}</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openFormDialog('certification', cert.id)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeCertification(cert.id);
                                    toast({
                                      title: "Certification Deleted",
                                      description: "The certification has been removed from your resume."
                                    });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8 border border-dashed rounded-md">
                          <File className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                          <p>No certifications added yet.</p>
                          <p className="text-sm">Click the button above to add your certifications.</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Languages - Show for all roles */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Languages</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => openFormDialog('language')}
                        >
                          <Plus className="h-4 w-4" />
                          Add Language
                        </Button>
                      </div>
                      
                      {resumeData.languages.length > 0 ? (
                        <div className="space-y-4">
                          {resumeData.languages.map((language) => (
                            <div key={language.id} className="flex items-start justify-between p-4 border rounded-lg relative group">
                              <div>
                                <h4 className="font-medium">{language.name}</h4>
                                <p className="text-sm text-gray-600 capitalize">{language.proficiency}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openFormDialog('language', language.id)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeLanguage(language.id);
                                    toast({
                                      title: "Language Deleted",
                                      description: "The language has been removed from your resume."
                                    });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8 border border-dashed rounded-md">
                          <File className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                          <p>No languages added yet.</p>
                          <p className="text-sm">Click the button above to add languages you speak.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('skills')}
                  >
                    Back
                  </Button>
                  <PDFDownload />
                </CardFooter>
              </Card>
              
              {/* Project Form Dialog */}
              {formDialog.type === 'project' && (
                <ProjectForm 
                  isOpen={formDialog.isOpen} 
                  onClose={closeFormDialog} 
                  projectId={formDialog.itemId}
                />
              )}

              {/* Certification Form Dialog */}
              {formDialog.type === 'certification' && (
                <CertificationForm 
                  isOpen={formDialog.isOpen} 
                  onClose={closeFormDialog} 
                  certificationId={formDialog.itemId}
                />
              )}

              {/* Language Form Dialog */}
              {formDialog.type === 'language' && (
                <LanguageForm 
                  isOpen={formDialog.isOpen} 
                  onClose={closeFormDialog} 
                  languageId={formDialog.itemId}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Preview */}
        <div className="w-full lg:w-1/2">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <div className="bg-white h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold">Resume Preview</h3>
                  <span className="text-sm text-gray-500">
                    Template: {
                      selectedTemplate === 'modern-developer' 
                        ? 'Modern Developer' 
                        : selectedTemplate === 'technical' 
                        ? 'Technical Expert'
                        : selectedTemplate === 'business'
                        ? 'Business Executive'
                        : selectedTemplate === 'creative'
                        ? 'Creative Professional'
                        : selectedTemplate === 'minimalist'
                        ? 'Minimalist'
                        : selectedTemplate === 'executive'
                        ? 'Executive Premium'
                        : selectedTemplate === 'simple-ats'
                        ? 'Simple ATS-Friendly'
                        : 'Professional'
                    }
                  </span>
                </div>
                
                <div id="resume-template-preview" className="flex-grow overflow-auto">
                  <ResumeTemplateRenderer />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Skill Suggestions Dialog */}
      {showSkillSuggestions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full mx-4">
            <SkillSuggestions
              role={resumeData.experiences.length > 0 ? resumeData.experiences[0].title : 'professional'}
              onClose={() => setShowSkillSuggestions(false)}
              onAddSkills={(skills) => {
                // Add the selected skills to the resume
                skills.forEach(skill => {
                  addSkill({ name: skill });
                });
                
                toast({
                  title: "Skills Added",
                  description: `${skills.length} skills have been added to your resume.`
                });
                
                // Close the dialog
                setShowSkillSuggestions(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
