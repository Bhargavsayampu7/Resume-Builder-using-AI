import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PDFDownload = () => {
  const { resumeData } = useResume();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    
    // Dynamically import the libraries when needed
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      // Select the resume template element
      const resumeElement = document.getElementById('resume-template-preview');
      
      if (!resumeElement) {
        throw new Error('Resume preview not found');
      }
      
      // Add a class to body or a container to apply print-specific styles
      const body = document.body;
      body.classList.add('pdf-rendering');
      // Add class to the resume element itself
      resumeElement.classList.add('pdf-rendering-element');
      
      toast({
        title: "Preparing PDF...",
        description: "Please wait while we generate your resume.",
      });
      
      // Use html2canvas to create an image of the resume
      const canvas = await html2canvas(resumeElement, {
        scale: 3, // Increased scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          // Ensure all fonts are loaded
          const style = clonedDoc.createElement('style');
          style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            * { font-family: 'Inter', sans-serif !important; }
            /* Styles to improve PDF rendering */
            .pdf-rendering-element {
              overflow: visible !important;
              height: auto !important; /* Allow content to dictate height */
              min-height: auto !important;
            }
            /* Optionally hide scrollbars or other screen-specific elements */
            .pdf-rendering ::-webkit-scrollbar { display: none; }
            .pdf-rendering { -ms-overflow-style: none; scrollbar-width: none; }
          `;
          clonedDoc.head.appendChild(style);
        }
      });
      
      // Create PDF with proper dimensions (A4)
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
        orientation: 'portrait',
        compress: true
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0); // Using PNG for better color preservation
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProperties = pdf.getImageProperties(imgData);
      const imgAspectRatio = imgProperties.width / imgProperties.height;
      
      // Define margins (e.g., 10mm on all sides)
      const margin = 10; // mm
      const contentWidth = pdfWidth - 2 * margin;
      const contentHeight = contentWidth / imgAspectRatio;

      let finalImgWidth = contentWidth;
      let finalImgHeight = contentHeight;
      let xOffset = margin;
      let yOffset = margin;

      // Adjust height and centering if the content height exceeds the available space with margins
      if (contentHeight > pdfHeight - 2 * margin) {
          finalImgHeight = pdfHeight - 2 * margin;
          finalImgWidth = finalImgHeight * imgAspectRatio;
          // Center horizontally if scaling by height
          xOffset = (pdfWidth - finalImgWidth) / 2;
      } else {
          // Center vertically if scaling by width
          yOffset = (pdfHeight - finalImgHeight) / 2;
      }

      // Add the image to the PDF
      pdf.addImage(
        imgData,
        'PNG', // Use PNG format
        xOffset,
        yOffset,
        finalImgWidth,
        finalImgHeight,
        undefined,
        'MEDIUM' // Using MEDIUM quality for potentially better rendering
      );
      
      // Save the PDF with a name based on user's name
      const fileName = resumeData.personalInfo.name
        ? `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`
        : 'resume.pdf';
        
      pdf.save(fileName);
      
      toast({
        title: "Success!",
        description: "Your resume has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Clean up the temporary classes
      body.classList.remove('pdf-rendering');
      resumeElement.classList.remove('pdf-rendering-element');
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleDownloadPDF}
      className="bg-resume-green hover:bg-resume-green/90 flex items-center gap-1"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Download PDF
    </Button>
  );
};

export default PDFDownload;
