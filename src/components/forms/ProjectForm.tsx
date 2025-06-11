import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { FileText, Plus, Pencil, Trash2, X, FileEdit, Loader2 } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { TextContext } from '@/utils/grammarChecker';

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}

const ProjectForm = ({ isOpen, onClose, projectId }: ProjectFormProps) => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  
  const defaultValues = {
    name: '',
    description: '',
    technologies: [],
    link: '',
    startDate: '',
    endDate: '',
  };
  
  // If editing, find existing project
  const existingProject = projectId 
    ? resumeData.projects.find(project => project.id === projectId) 
    : undefined;
  
  const [formData, setFormData] = useState(existingProject || defaultValues);
  const [techInput, setTechInput] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const aiService = new AIService();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };
  
  const handleRemoveTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name) {
      toast({
        title: "Missing project name",
        description: "Please enter a project name.",
        variant: "destructive",
      });
      return;
    }
    
    // Add or update project
    if (projectId) {
      updateProject(projectId, formData);
      toast({
        title: "Project updated",
        description: "Your project has been updated."
      });
    } else {
      addProject(formData);
      toast({
        title: "Project added",
        description: "Your project has been added to your resume."
      });
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (projectId) {
      removeProject(projectId);
      toast({
        title: "Project removed",
        description: "Your project has been removed from your resume."
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
      
      // Pass technologies as keywords for enhanced improvement
      const improvedText = await aiService.improveText(
        formData.description, 
        'project', 
        formData.technologies
      );
      
      setFormData(prev => ({
        ...prev,
        description: improvedText
      }));
      
      toast({
        title: "Text Improved",
        description: "Your project description has been enhanced with relevant keywords and impact statements.",
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
  
  const handleSuggestProjectDetails = async () => {
    try {
      setIsSuggesting(true);
      
      if (!formData.name) {
        toast({
          title: "Error",
          description: "Please enter a project name first.",
          variant: "destructive"
        });
        setIsSuggesting(false);
        return;
      }
      
      const { description, technologies } = await aiService.suggestProjectDetails(formData.name);
      
      setFormData(prev => ({
        ...prev,
        description,
        technologies: [...technologies]
      }));
      
      toast({
        title: "Project Details Generated",
        description: "Project description and technologies have been generated based on your project name.",
      });
    } catch (error) {
      console.error('Error suggesting project details:', error);
      toast({
        title: "Error",
        description: "Failed to generate project details. Please try again.",
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
            <FileText className="h-5 w-5" />
            {projectId ? "Edit Project" : "Add Project"}
          </DialogTitle>
          <DialogDescription>
            {projectId ? "Update your project details below." : "Fill in your project details below."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name<span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              placeholder="E-commerce Platform"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link">Project Link</Label>
            <Input
              id="link"
              name="link"
              autoComplete="url"
              value={formData.link || ''}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                autoComplete="off"
                value={formData.startDate || ''}
                onChange={handleChange}
                placeholder="Sep 2022"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                autoComplete="off"
                value={formData.endDate || ''}
                onChange={handleChange}
                placeholder="Feb 2023 or Ongoing"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Project Description</Label>
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-blue-600 h-6 px-2 flex items-center gap-1"
                  onClick={handleSuggestProjectDetails}
                  disabled={isSuggesting || !formData.name}
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
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Describe the project, your role, and achievements..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, Node.js, etc."
                className="flex-grow"
              />
              <Button 
                type="button"
                onClick={handleAddTech}
                size="sm"
              >
                Add
              </Button>
            </div>
            
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            {projectId && (
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
              {projectId ? <Pencil className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
              {projectId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
