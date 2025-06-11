import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LanguageFormProps {
  isOpen: boolean;
  onClose: () => void;
  languageId?: string;
}

const LanguageForm = ({ isOpen, onClose, languageId }: LanguageFormProps) => {
  const { resumeData, addLanguage, updateLanguage } = useResume();
  const [formData, setFormData] = useState({
    name: '',
    proficiency: 'basic' as 'basic' | 'intermediate' | 'fluent' | 'native'
  });

  useEffect(() => {
    if (languageId) {
      const language = resumeData.languages.find(l => l.id === languageId);
      if (language) {
        setFormData({
          name: language.name,
          proficiency: language.proficiency
        });
      }
    }
  }, [languageId, resumeData.languages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProficiencyChange = (value: string) => {
    setFormData(prev => ({ ...prev, proficiency: value as 'basic' | 'intermediate' | 'fluent' | 'native' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (languageId) {
      updateLanguage(languageId, formData);
    } else {
      addLanguage(formData);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            {languageId ? "Edit Language" : "Add Language"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Language<span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              autoComplete="language"
              value={formData.name}
              onChange={handleChange}
              placeholder="English"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proficiency">Proficiency Level<span className="text-red-500">*</span></Label>
            <Select
              value={formData.proficiency}
              onValueChange={handleProficiencyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select proficiency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="native">Native</SelectItem>
                <SelectItem value="fluent">Fluent</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {languageId ? "Update" : "Add"} Language
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageForm; 