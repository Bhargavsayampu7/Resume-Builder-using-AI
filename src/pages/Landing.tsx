import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Landing = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Welcome to ResumeAI",
      description: "Create professional, ATS-friendly resumes with AI assistance.",
      duration: 5000,
    });
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-10 md:py-20 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-white to-resume-light-purple/30">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Create <span className="gradient-text">ATS-Friendly</span> Resumes with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
            Stand out from the competition with professionally designed templates and AI-powered content suggestions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-resume-green hover:bg-resume-green/90 text-white px-8">
              <Link to="/path-selection">
                Create Resume <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative animate-slide-up">
          <div className="w-full max-w-md relative">
            <div className="absolute inset-0 bg-gradient-radial from-resume-purple/20 to-transparent rounded-lg transform -translate-x-4 -translate-y-4"></div>
            <div className="relative bg-white rounded-lg shadow-xl border border-gray-100 p-6 md:p-8">
              <img 
                src="/lovable-uploads/landingpage.jpg" 
                alt="Resume Preview" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ResumeAI</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our platform combines beautiful design with powerful AI to help you land your dream job.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "ATS-Optimized Templates",
              description: "Our templates are designed to pass through Applicant Tracking Systems with ease.",
              icon: "📝",
              color: "bg-resume-light-purple"
            },
            {
              title: "AI Content Suggestions",
              description: "Get intelligent recommendations for improving your resume content.",
              icon: "🤖",
              color: "bg-resume-light-blue"
            },
            {
              title: "Grammar Correction",
              description: "Ensure your resume is error-free with our AI-powered grammar checker.",
              icon: "✓",
              color: "bg-resume-light-green"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* ATS Score Section */}
        <div className="mt-16 md:mt-24 bg-gradient-to-br from-resume-purple/90 to-resume-blue/90 rounded-2xl text-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Check Your ATS Score</h2>
              <p className="text-lg opacity-90 mb-6">Our AI analyzes your resume against ATS criteria to ensure it gets past automated filters and into human hands.</p>
              <Button asChild size="lg" className="bg-white text-resume-purple hover:bg-gray-100">
                <Link to="/path-selection">Try It Now</Link>
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-semibold">ATS Score</div>
                  <div className="text-2xl font-bold">85%</div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Keyword Optimization", value: 90 },
                    { label: "Format Compatibility", value: 85 },
                    { label: "Section Completeness", value: 75 }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2" 
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Template Preview */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Resume Templates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose from our collection of professionally designed templates for every career path.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Modern Developer",
              image: "modern-dev",
              color: "bg-resume-light-blue",
              path: "technical"
            },
            {
              name: "Business Executive",
              image: "business",
              color: "bg-resume-light-purple",
              path: "non-technical"
            },
            {
              name: "Creative Professional",
              image: "creative",
              color: "bg-resume-light-green",
              path: "non-technical"
            }
          ].map((template, index) => (
            <div key={index} className="group relative rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all">
              <div className={`aspect-[3/4] ${template.color}`}>
                <div className="absolute inset-0 flex flex-col p-8">
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
                </div>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Button asChild className="bg-white text-gray-800 hover:bg-gray-100">
                  <Link to="/path-selection">Use This Template</Link>
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 text-center">
                <h3 className="font-semibold text-gray-800">{template.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{template.path} Path</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-resume-purple hover:bg-resume-purple/90">
            <Link to="/path-selection">View All Templates</Link>
          </Button>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Perfect Resume?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of job seekers who have successfully landed interviews with our AI-powered resume builder.</p>
          <Button asChild size="lg" className="btn-gradient px-8 py-6 text-lg">
            <Link to="/path-selection">Create Your Resume Now</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-4">ResumeAI</h3>
              <p className="text-gray-400 max-w-xs">Create professional, ATS-friendly resumes with the power of artificial intelligence.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-medium mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><Link to="/path-selection" className="hover:text-white transition-colors">Templates</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 ResumeAI. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
