
import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Star, Plus, Pencil, Trash2 } from 'lucide-react';

interface SkillFormProps {
  isOpen: boolean;
  onClose: () => void;
  skillId?: string;
}

const SkillForm = ({ isOpen, onClose, skillId }: SkillFormProps) => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  
  const defaultValues = {
    name: '',
    level: 3,
  };
  
  // If editing, find existing skill
  const existingSkill = skillId 
    ? resumeData.skills.find(skill => skill.id === skillId) 
    : undefined;
  
  const [formData, setFormData] = useState(existingSkill || defaultValues);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLevelChange = (value: string) => {
    setFormData(prev => ({ ...prev, level: parseInt(value) }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name) {
      toast({
        title: "Missing skill name",
        description: "Please enter a skill name.",
        variant: "destructive",
      });
      return;
    }
    
    // Add or update skill
    if (skillId) {
      updateSkill(skillId, formData);
      toast({
        title: "Skill updated",
        description: "Your skill has been updated."
      });
    } else {
      addSkill(formData);
      toast({
        title: "Skill added",
        description: "Your skill has been added to your resume."
      });
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (skillId) {
      removeSkill(skillId);
      toast({
        title: "Skill removed",
        description: "Your skill has been removed from your resume."
      });
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            {skillId ? "Edit Skill" : "Add Skill"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name<span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="JavaScript"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="level">Proficiency Level</Label>
            <Select
              value={formData.level?.toString()}
              onValueChange={handleLevelChange}
            >
              <SelectTrigger id="level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Beginner</SelectItem>
                <SelectItem value="2">Elementary</SelectItem>
                <SelectItem value="3">Intermediate</SelectItem>
                <SelectItem value="4">Advanced</SelectItem>
                <SelectItem value="5">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            {skillId && (
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
              {skillId ? <Pencil className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
              {skillId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillForm;
