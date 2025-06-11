import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';

interface CertificationFormProps {
  isOpen: boolean;
  onClose: () => void;
  certificationId?: string;
}

const CertificationForm = ({ isOpen, onClose, certificationId }: CertificationFormProps) => {
  const { resumeData, addCertification, updateCertification } = useResume();
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    credentialID: '',
    link: ''
  });

  useEffect(() => {
    if (certificationId) {
      const certification = resumeData.certifications.find(c => c.id === certificationId);
      if (certification) {
        setFormData({
          name: certification.name,
          issuer: certification.issuer,
          date: certification.date,
          credentialID: certification.credentialID || '',
          link: certification.link || ''
        });
      }
    }
  }, [certificationId, resumeData.certifications]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (certificationId) {
      updateCertification(certificationId, formData);
    } else {
      addCertification(formData);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            {certificationId ? "Edit Certification" : "Add Certification"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Certification Name<span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              placeholder="AWS Certified Solutions Architect"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization<span className="text-red-500">*</span></Label>
            <Input
              id="issuer"
              name="issuer"
              autoComplete="organization"
              value={formData.issuer}
              onChange={handleChange}
              placeholder="Amazon Web Services"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date Earned<span className="text-red-500">*</span></Label>
            <Input
              id="date"
              name="date"
              autoComplete="off"
              value={formData.date}
              onChange={handleChange}
              placeholder="Jan 2023"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="credentialID">Credential ID</Label>
            <Input
              id="credentialID"
              name="credentialID"
              autoComplete="off"
              value={formData.credentialID}
              onChange={handleChange}
              placeholder="AWS-123456"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link">Verification Link</Label>
            <Input
              id="link"
              name="link"
              autoComplete="url"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://verify.aws.com/cert/123"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {certificationId ? "Update" : "Add"} Certification
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationForm; 