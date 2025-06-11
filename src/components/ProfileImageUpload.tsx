
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  onImageRemove: () => void;
}

const ProfileImageUpload = ({ currentImage, onImageChange, onImageRemove }: ProfileImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive",
      });
      return;
    }

    // Create a data URL from the file
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(undefined);
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              type="button"
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
            <ImagePlus className="h-10 w-10 text-gray-400" />
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        id="profile-image-upload"
      />
      
      {!previewUrl && (
        <Button 
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm"
        >
          Upload Photo
        </Button>
      )}
      
      <p className="text-xs text-gray-500 text-center">
        Recommended: Square image, max 2MB
      </p>
    </div>
  );
};

export default ProfileImageUpload;
