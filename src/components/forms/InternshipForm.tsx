import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Briefcase, Plus, Pencil, Trash2 } from 'lucide-react';

interface InternshipFormProps {
  isOpen: boolean;
  onClose: () => void;
  internshipId?: string;
}

const InternshipForm = ({ isOpen, onClose, internshipId }: InternshipFormProps) => {
  const { resumeData, addInternship, updateInternship, removeInternship } = useResume();
  
  const defaultValues = {
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  };
  
  // If editing, find existing internship
  const existingInternship = internshipId 
    ? resumeData.internships.find(intern => intern.id === internshipId) 
    : undefined;
  
  const [formData, setFormData] = useState(existingInternship || defaultValues);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    
    // Add or update internship
    if (internshipId) {
      updateInternship(internshipId, formData);
      toast({
        title: "Internship updated",
        description: "Your internship details have been updated."
      });
    } else {
      addInternship(formData);
      toast({
        title: "Internship added",
        description: "Your internship has been added to your resume."
      });
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (internshipId) {
      removeInternship(internshipId);
      toast({
        title: "Internship removed",
        description: "Your internship has been removed from your resume."
      });
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {internshipId ? "Edit Internship" : "Add Internship"}
          </DialogTitle>
          <DialogDescription>
            {internshipId ? "Update your internship details below." : "Fill in your internship details below."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Position/Role<span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Software Engineering Intern"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company<span className="text-red-500">*</span></Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Tech Company Inc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date<span className="text-red-500">*</span></Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Jun 2023"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="Aug 2023 or Present"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Describe your responsibilities, achievements, and key learnings..."
              rows={3}
            />
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            {internshipId && (
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
              {internshipId ? <Pencil className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
              {internshipId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InternshipForm; 