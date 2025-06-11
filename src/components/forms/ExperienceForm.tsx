
import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Briefcase, Plus, Pencil, Trash2, FileEdit, Loader2 } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { TextContext } from '@/utils/grammarChecker';

interface ExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  experienceId?: string;
}

const ExperienceForm = ({ isOpen, onClose, experienceId }: ExperienceFormProps) => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  
  const defaultValues = {
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  };
  
  // If editing, find existing experience item
  const existingExperience = experienceId 
    ? resumeData.experiences.find(exp => exp.id === experienceId) 
    : undefined;
  
  const [formData, setFormData] = useState(existingExperience || defaultValues);
  const [isImproving, setIsImproving] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const aiService = new AIService();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      current: checked,
      endDate: checked ? 'Present' : prev.endDate 
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.company || !formData.startDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Add or update experience
    if (experienceId) {
      updateExperience(experienceId, formData);
      toast({
        title: "Experience updated",
        description: "Your work experience has been updated."
      });
    } else {
      addExperience(formData);
      toast({
        title: "Experience added",
        description: "Your work experience has been added to your resume."
      });
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (!experienceId) return;
    
    removeExperience(experienceId);
    toast({
      title: 'Experience Deleted',
      description: 'Experience has been removed from your resume.'
    });
    onClose();
  };
  
  const handleImproveText = async () => {
    try {
      setIsImproving(true);
      
      if (!formData.description) {
        toast({
          title: "Error",
          description: "No text to improve. Please add some content first.",
          variant: "destructive"
        });
        setIsImproving(false);
        return;
      }
      
      const improvedText = await aiService.improveText(formData.description, 'experience');
      
      setFormData(prev => ({
        ...prev,
        description: improvedText
      }));
      
      toast({
        title: "Text Improved",
        description: "Your experience description has been professionally enhanced.",
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
  
  const handleSuggestDescription = async () => {
    try {
      setIsSuggesting(true);
      
      if (!formData.title) {
        toast({
          title: "Error",
          description: "Please enter a job title first.",
          variant: "destructive"
        });
        setIsSuggesting(false);
        return;
      }
      
      const suggestedDescription = await aiService.suggestJobDescription(formData.title, formData.company);
      
      setFormData(prev => ({
        ...prev,
        description: suggestedDescription
      }));
      
      toast({
        title: "Description Generated",
        description: "Job description has been generated based on your title.",
      });
    } catch (error) {
      console.error('Error suggesting description:', error);
      toast({
        title: "Error",
        description: "Failed to generate description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSuggesting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {experienceId ? "Edit Work Experience" : "Add Work Experience"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title<span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              autoComplete="organization-title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Senior Software Engineer"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company<span className="text-red-500">*</span></Label>
            <Input
              id="company"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Inc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              autoComplete="address-level1"
              value={formData.location}
              onChange={handleChange}
              placeholder="New York, NY"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date<span className="text-red-500">*</span></Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                autoComplete="off"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Sep 2020"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                autoComplete="off"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="May 2022"
                disabled={formData.current}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="current"
              checked={formData.current}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="current" className="text-sm font-normal">
              I currently work here
            </Label>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-blue-600 h-6 px-2 flex items-center gap-1"
                  onClick={handleSuggestDescription}
                  disabled={isSuggesting || !formData.title}
                >
                  {isSuggesting ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Suggesting...</span>
                    </>
                  ) : (
                    <>
                      <FileEdit className="h-3 w-3" />
                      <span>AI Suggest</span>
                    </>
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-purple-600 h-6 px-2 flex items-center gap-1"
                  onClick={handleImproveText}
                  disabled={isImproving || !formData.description}
                >
                  {isImproving ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Improving...</span>
                    </>
                  ) : (
                    <>
                      <FileEdit className="h-3 w-3" />
                      <span>AI Improve</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            <Textarea
              id="description"
              name="description"
              autoComplete="off"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities, achievements, and relevant experience..."
              rows={6}
            />
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            {experienceId && (
              <Button 
                type="button" 
                variant="destructive"
                onClick={handleDelete}
                className="mr-auto"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
            <Button 
              type="button" 
              onClick={onClose} 
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">
              {experienceId ? <Pencil className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
              {experienceId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceForm;
