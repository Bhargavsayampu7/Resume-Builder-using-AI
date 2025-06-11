
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, Columns } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/contexts/ResumeContext";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";

type TemplateOption = {
  id: string;
  name: string;
  type: "modern-developer" | "technical" | "business" | "creative" | "minimalist" | "executive" | "simple-ats" | "data-scientist" | "healthcare" | "hospitality" | "sales-executive" | "teaching";
  description: string;
  color: string;
  layout: "single-column" | "two-column";
  showProfileImage: boolean;
  atsOptimized: boolean;
  previewImage?: string;
  industry?: string[];
};

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { careerPath, experienceLevel, industry, setSelectedTemplate, updateTemplateCustomization } = useResume();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [filterAts, setFilterAts] = useState(false);
  
  // Generate template options based on career path and experience level
  let templateOptions: TemplateOption[] = [];
  
  if (careerPath === 'technical') {
    templateOptions = [
      {
        id: "template1",
        name: "Modern Developer",
        type: "modern-developer",
        description: "Clean, minimalist two-column design with emphasis on technical skills and projects.",
        color: "bg-resume-light-purple",
        layout: "two-column",
        showProfileImage: true,
        atsOptimized: false,
        previewImage: "/lovable-uploads/7b64ca72-ae6f-4402-82a9-c94bec34c6d6.png"
      },
      {
        id: "template2",
        name: "Technical Expert",
        type: "technical",
        description: "Structured two-column layout highlighting technical expertise and projects.",
        color: "bg-resume-light-blue",
        layout: "two-column",
        showProfileImage: true,
        atsOptimized: false,
        previewImage: "/lovable-uploads/8e29e8f5-b815-473d-8f45-6c510a354359.png"
      },
      {
        id: "template3",
        name: "Simple ATS-Friendly",
        type: "simple-ats",
        description: "Clean single-column format optimized for ATS systems with clear sections.",
        color: "bg-resume-light-green",
        layout: "single-column",
        showProfileImage: false,
        atsOptimized: true,
        previewImage: "/lovable-uploads/05ee4027-6144-4165-a417-a2bca811c716.png"
      },
      {
        id: "template4",
        name: "Minimalist Coder",
        type: "minimalist",
        description: "Elegant single-column design with focus on readability and clean presentation.",
        color: "bg-resume-light-purple",
        layout: "single-column",
        showProfileImage: false,
        atsOptimized: true,
        previewImage: "/lovable-uploads/bcb67774-ab8d-4e1e-85c8-b0ee3634ef02.png"
      },
      {
        id: "template5",
        name: "Data Scientist",
        type: "data-scientist",
        description: "Modern layout highlighting technical skills, projects, and data analytics experience.",
        color: "bg-resume-light-blue",
        layout: "two-column",
        showProfileImage: true,
        atsOptimized: false,
        previewImage: "/lovable-uploads/719c24d7-24e3-4aab-a3a4-c92d9b4247c7.png"
      }
    ];
  } else {
    // Filter templates based on industry
    const industrySpecificTemplates: TemplateOption[] = [
      {
        id: "template6",
        name: "Creative Professional",
        type: "creative",
        description: "Visually appealing two-column layout with subtle color accents and portfolio section.",
        color: "bg-resume-light-purple",
        layout: "two-column",
        showProfileImage: true,
        atsOptimized: false,
        industry: ['hospitality', 'food', 'teaching']
      },
      {
        id: "template7",
        name: "Business Executive",
        type: "business",
        description: "Professional, conservative single-column design with focus on achievements and leadership.",
        color: "bg-resume-light-blue",
        layout: "single-column",
        showProfileImage: false,
        atsOptimized: true,
        industry: ['healthcare', 'hospitality']
      },
      {
        id: "template8",
        name: "Executive Premium",
        type: "executive",
        description: "Sophisticated layout highlighting leadership experience and accomplishments.",
        color: "bg-resume-light-green",
        layout: "single-column",
        showProfileImage: true,
        atsOptimized: false,
        industry: ['healthcare', 'teaching'],
        previewImage: "/lovable-uploads/5cc5ead7-9c4b-4758-a1e3-6c8d2fa27e47.png"
      },
      {
        id: "template9",
        name: "Simple ATS-Friendly",
        type: "simple-ats",
        description: "Clean single-column format optimized for ATS systems with clear sections.",
        color: "bg-resume-light-blue",
        layout: "single-column",
        showProfileImage: false,
        atsOptimized: true,
        previewImage: "/lovable-uploads/f6ea2584-dd0d-4f95-91a7-3721aa83e986.png"
      },
      {
        id: "template10",
        name: "Healthcare Professional",
        type: "healthcare",
        description: "Clean format designed for healthcare professionals with medical experience highlight.",
        color: "bg-resume-light-blue",
        layout: "two-column",
        showProfileImage: true,
        atsOptimized: true,
        industry: ['healthcare'],
        previewImage: "/lovable-uploads/9d61cb01-efd4-4b7b-a7af-f269485952fd.png"
      },
      {
        id: "template11",
        name: "Hospitality Manager",
        type: "hospitality",
        description: "Elegant design for hospitality professionals focusing on customer service and management.",
        color: "bg-resume-light-green",
        layout: "two-column",
        showProfileImage: true,
        atsOptimized: false,
        industry: ['hospitality', 'food'],
        previewImage: "/lovable-uploads/20c81c22-d328-4160-aa4e-6dc80c791b47.png"
      },
      {
        id: "template12",
        name: "Sales Executive",
        type: "sales-executive",
        description: "Professional layout for sales professionals highlighting achievements and metrics.",
        color: "bg-resume-light-blue",
        layout: "single-column",
        showProfileImage: false,
        atsOptimized: true,
        industry: ['sales', 'business'],
        previewImage: "/lovable-uploads/62a91cfd-6c76-4300-9f58-4f9a486e3d67.png"
      },
      {
        id: "template13",
        name: "Teaching Professional",
        type: "teaching",
        description: "Educational resume design with sections for teaching experience and certifications.",
        color: "bg-resume-light-purple",
        layout: "two-column",
        showProfileImage: true,
        atsOptimized: false,
        industry: ['teaching', 'education'],
        previewImage: "/lovable-uploads/f9a2d728-cdcc-438f-81cd-e92a9c3bf7c4.png"
      }
    ];
    
    if (industry) {
      templateOptions = industrySpecificTemplates.filter(template => 
        !template.industry || template.industry.includes(industry)
      );
    } else {
      templateOptions = industrySpecificTemplates;
    }
  }

  // Apply ATS filter if selected
  if (filterAts) {
    templateOptions = templateOptions.filter(template => template.atsOptimized);
  }

  const handleContinue = () => {
    if (!selectedTemplateId) {
      toast({
        title: "No template selected",
        description: "Please select a template to continue.",
        variant: "destructive",
      });
      return;
    }

    const template = templateOptions.find(t => t.id === selectedTemplateId);
    if (template) {
      setSelectedTemplate(template.type);
      
      // Update template customization based on selected template
      updateTemplateCustomization({
        layout: template.layout,
        showProfileImage: template.showProfileImage,
        primaryColor: template.type === 'modern-developer' ? '#6D28D9' : 
                     template.type === 'technical' ? '#2563EB' :
                     template.type === 'business' ? '#1E40AF' :
                     template.type === 'creative' ? '#8B5CF6' :
                     template.type === 'minimalist' ? '#4B5563' :
                     template.type === 'executive' ? '#047857' :
                     template.type === 'simple-ats' ? '#1F2937' :
                     template.type === 'data-scientist' ? '#4FB3D9' :
                     template.type === 'healthcare' ? '#4FB3D9' :
                     template.type === 'hospitality' ? '#2E5984' :
                     template.type === 'sales-executive' ? '#3B82F6' :
                     template.type === 'teaching' ? '#4F46E5' : '#6D28D9'
      });
      
      navigate('/builder');
    }
  };

  const handleBackClick = () => {
    if (careerPath === 'technical') {
      navigate('/experience-selection');
    } else {
      navigate('/path-selection');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-6">
        <div className="w-full max-w-6xl">
          <div className="mb-8">
            <button onClick={handleBackClick} className="text-resume-purple hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Resume Template</h1>
            <p className="text-lg text-gray-600 mb-6">
              Select a template that best represents your professional style.
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ats" 
                  checked={filterAts} 
                  onCheckedChange={(checked) => setFilterAts(checked as boolean)}
                />
                <label
                  htmlFor="ats"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show ATS-Optimized Templates Only
                </label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateOptions.length > 0 ? templateOptions.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all overflow-hidden border-2 hover:shadow-md h-[400px] relative ${
                  selectedTemplateId === template.id 
                    ? 'border-resume-purple shadow-md' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedTemplateId(template.id)}
              >
                {selectedTemplateId === template.id && (
                  <div className="absolute top-3 right-3 z-10 bg-resume-purple text-white rounded-full p-1">
                    <Check size={16} />
                  </div>
                )}
                
                <div className={`aspect-[3/4] h-[300px] ${template.previewImage ? '' : template.color} relative`}>
                  {template.previewImage ? (
                    <img 
                      src={template.previewImage} 
                      alt={template.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <>
                      {/* Layout indicator */}
                      <div className="absolute top-3 left-3 bg-white/80 rounded-full p-1">
                        <Columns size={16} className={template.layout === 'two-column' ? 'opacity-100' : 'opacity-50'} />
                      </div>
                      
                      {/* ATS optimized badge */}
                      {template.atsOptimized && (
                        <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">
                          ATS-Friendly
                        </div>
                      )}
                      
                      {/* Profile image indicator */}
                      {template.showProfileImage && (
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 flex flex-col p-8">
                        {template.layout === 'two-column' ? (
                          <div className="flex h-full">
                            <div className="w-1/3 pr-2 border-r border-white/30">
                              <div className="h-8 w-full bg-white/80 rounded mb-4"></div>
                              <div className="h-4 w-full bg-white/60 rounded mb-8"></div>
                              
                              <div className="h-4 w-full bg-white/80 rounded mb-2"></div>
                              <div className="space-y-1 mb-6">
                                <div className="h-2 w-full bg-white/60 rounded"></div>
                                <div className="h-2 w-full bg-white/60 rounded"></div>
                              </div>
                            </div>
                            <div className="w-2/3 pl-2">
                              <div className="h-4 w-1/3 bg-white/80 rounded mb-2"></div>
                              <div className="h-3 w-5/6 bg-white/60 rounded mb-1"></div>
                              <div className="h-3 w-4/6 bg-white/60 rounded mb-6"></div>
                              
                              <div className="h-4 w-1/3 bg-white/80 rounded mb-2"></div>
                              <div className="space-y-1 mb-6">
                                <div className="h-3 w-full bg-white/60 rounded"></div>
                                <div className="h-3 w-full bg-white/60 rounded"></div>
                                <div className="h-3 w-4/5 bg-white/60 rounded"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="h-8 w-2/3 bg-white/80 rounded mb-4"></div>
                            <div className="h-4 w-1/2 bg-white/60 rounded mb-8"></div>
                            
                            <div className="h-4 w-1/3 bg-white/80 rounded mb-2"></div>
                            <div className="h-3 w-5/6 bg-white/60 rounded mb-1"></div>
                            <div className="h-3 w-4/6 bg-white/60 rounded mb-6"></div>
                            
                            <div className="h-4 w-1/3 bg-white/80 rounded mb-2"></div>
                            <div className="space-y-1 mb-6">
                              <div className="h-3 w-full bg-white/60 rounded"></div>
                              <div className="h-3 w-full bg-white/60 rounded"></div>
                              <div className="h-3 w-4/5 bg-white/60 rounded"></div>
                            </div>
                            
                            <div className="mt-auto">
                              <div className="flex flex-wrap gap-2">
                                <div className="h-6 w-16 bg-white/70 rounded-full"></div>
                                <div className="h-6 w-16 bg-white/70 rounded-full"></div>
                                <div className="h-6 w-16 bg-white/70 rounded-full"></div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
                </div>
              </Card>
            )) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                <p>No templates match your current filter. Please adjust your selection.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilterAts(false)}
                  className="mt-4"
                >
                  Show All Templates
                </Button>
              </div>
            )}
          </div>
          
          {templateOptions.length > 0 && (
            <div className="mt-10 flex justify-center">
              <Button 
                onClick={handleContinue}
                className="bg-resume-purple hover:bg-resume-purple/90 text-white px-8"
                size="lg"
              >
                Use This Template
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Templates;
