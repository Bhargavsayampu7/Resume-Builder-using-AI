import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Paintbrush, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define color options with descriptive names
const colorOptions = [
  { name: 'Purple', value: '#6D28D9' },
  { name: 'Blue', value: '#2563EB' },
  { name: 'Green', value: '#047857' },
  { name: 'Teal', value: '#0D9488' },
  { name: 'Red', value: '#DC2626' },
  { name: 'Orange', value: '#EA580C' },
  { name: 'Pink', value: '#DB2777' },
  { name: 'Gray', value: '#4B5563' },
  { name: 'Dark Blue', value: '#1E40AF' },
  { name: 'Dark Gray', value: '#1F2937' },
];

// Define font options
const fontOptions = [
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Playfair Display', value: 'Playfair Display, serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Merriweather', value: 'Merriweather, serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
];

const TemplateCustomizer = () => {
  const { templateCustomization, updateTemplateCustomization } = useResume();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [tempCustomization, setTempCustomization] = useState(templateCustomization);

  const handleOpenDialog = () => {
    setTempCustomization(templateCustomization);
    setIsOpen(true);
  };

  const handleColorChange = (color: string) => {
    setTempCustomization(prev => ({ ...prev, primaryColor: color }));
  };

  const handleFontChange = (font: string) => {
    setTempCustomization(prev => ({ ...prev, fontFamily: font }));
  };

  const handleShowProfileImageChange = (showImage: boolean) => {
    setTempCustomization(prev => ({ ...prev, showProfileImage: showImage }));
  };

  const handleSaveChanges = () => {
    updateTemplateCustomization(tempCustomization);
    setIsOpen(false);
    
    toast({
      title: "Template Updated",
      description: "Your resume template customization has been applied.",
    });
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="flex items-center gap-1"
        onClick={handleOpenDialog}
      >
        <Paintbrush className="h-4 w-4" />
        Customize
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customize Template</DialogTitle>
            <DialogDescription>
              Adjust the template settings to match your preferences.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            {/* Color Selection */}
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full transition-all relative ${
                      tempCustomization.primaryColor === color.value
                        ? 'ring-2 ring-offset-2 ring-gray-400'
                        : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value)}
                    title={color.name}
                  >
                    {tempCustomization.primaryColor === color.value && (
                      <Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Selection */}
            <div className="space-y-2">
              <Label htmlFor="font-select">Font Family</Label>
              <Select
                value={tempCustomization.fontFamily}
                onValueChange={handleFontChange}
              >
                <SelectTrigger id="font-select">
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem 
                      key={font.value} 
                      value={font.value}
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Profile Image Toggle */}
            <div className="space-y-2">
              <Label>Profile Image</Label>
              <div className="flex gap-2">
                <Button
                  variant={tempCustomization.showProfileImage ? "default" : "outline"}
                  className={tempCustomization.showProfileImage ? "bg-resume-purple hover:bg-resume-purple/90" : ""}
                  onClick={() => handleShowProfileImageChange(true)}
                >
                  Show Photo
                </Button>
                <Button
                  variant={!tempCustomization.showProfileImage ? "default" : "outline"}
                  className={!tempCustomization.showProfileImage ? "bg-resume-purple hover:bg-resume-purple/90" : ""}
                  onClick={() => handleShowProfileImageChange(false)}
                >
                  Hide Photo
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveChanges}
              className="bg-resume-purple hover:bg-resume-purple/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplateCustomizer;
