import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { GraduationCap, Plus, Pencil, Trash2, FileEdit, Loader2 } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { TextContext } from '@/utils/grammarChecker';

interface EducationFormProps {
  isOpen: boolean;
  onClose: () => void;
  educationId?: string;
}

const EducationForm = ({ isOpen, onClose, educationId }: EducationFormProps) => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  
  const defaultValues = {
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  };
  
  // If editing, find existing education item
  const existingEducation = educationId 
    ? resumeData.education.find(edu => edu.id === educationId) 
    : undefined;
  
  const [formData, setFormData] = useState(existingEducation || defaultValues);
  const [isImproving, setIsImproving] = useState(false);
  const aiService = new AIService();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.degree || !formData.institution || !formData.startDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Add or update education
    if (educationId) {
      updateEducation(educationId, formData);
      toast({
        title: "Education updated",
        description: "Your education details have been updated."
      });
    } else {
      addEducation(formData);
      toast({
        title: "Education added",
        description: "Your education has been added to your resume."
      });
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (educationId) {
      removeEducation(educationId);
      toast({
        title: "Education removed",
        description: "Your education has been removed from your resume."
      });
      onClose();
    }
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
      
      const improvedText = await aiService.improveText(formData.description, 'education');
      
      setFormData(prev => ({
        ...prev,
        description: improvedText
      }));
      
      toast({
        title: "Text Improved",
        description: "Your education description has been professionally enhanced.",
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            {educationId ? "Edit Education" : "Add Education"}
          </DialogTitle>
          <DialogDescription>
            {educationId ? "Update your education details below." : "Fill in your education details below."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="degree">Degree/Qualification<span className="text-red-500">*</span></Label>
            <Input
              id="degree"
              name="degree"
              autoComplete="off"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="institution">Institution<span className="text-red-500">*</span></Label>
            <Input
              id="institution"
              name="institution"
              autoComplete="organization"
              value={formData.institution}
              onChange={handleChange}
              placeholder="University of Technology"
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
                placeholder="Sep 2018"
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
                placeholder="May 2022 or Present"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
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
            <Textarea
              id="description"
              name="description"
              autoComplete="off"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Relevant coursework, achievements, or other details..."
              rows={3}
            />
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            {educationId && (
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
              {educationId ? <Pencil className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
              {educationId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EducationForm;
