
import { useResume } from '@/contexts/ResumeContext';
import ModernDeveloperTemplate from './ModernDeveloperTemplate';
import BusinessTemplate from './BusinessTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import TechnicalTemplate from './TechnicalTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import CreativeTemplate from './CreativeTemplate';
import SimpleATSTemplate from './SimpleATSTemplate';
import DataScientistTemplate from './DataScientistTemplate';
import HealthcareTemplate from './HealthcareTemplate';
import HospitalityTemplate from './HospitalityTemplate';
import SalesExecutiveTemplate from './SalesExecutiveTemplate';
import TeachingTemplate from './TeachingTemplate';

interface ResumeTemplateRendererProps {
  printMode?: boolean;
}

const ResumeTemplateRenderer = ({ printMode = false }: ResumeTemplateRendererProps) => {
  const { selectedTemplate } = useResume();

  // Wrapper classes change based on whether we're in print mode or preview mode
  const wrapperClasses = printMode
    ? "w-full h-full"
    : "w-full h-full flex items-center justify-center p-6 overflow-auto";

  // Select the appropriate template component based on selectedTemplate
  const renderTemplate = () => {
    switch(selectedTemplate) {
      case 'modern-developer':
        return <ModernDeveloperTemplate />;
      case 'business':
        return <BusinessTemplate />;
      case 'minimalist':
        return <MinimalistTemplate />;
      case 'technical':
        return <TechnicalTemplate />;
      case 'executive':
        return <ExecutiveTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      case 'simple-ats':
        return <SimpleATSTemplate />;
      case 'data-scientist':
        return <DataScientistTemplate />;
      case 'healthcare':
        return <HealthcareTemplate />;
      case 'hospitality':
        return <HospitalityTemplate />;
      case 'sales-executive':
        return <SalesExecutiveTemplate />;
      case 'teaching':
        return <TeachingTemplate />;
      // We'll return ModernDeveloperTemplate as default for now
      default:
        return <ModernDeveloperTemplate />;
    }
  };

  return (
    <div id="resume-template-preview" className={wrapperClasses}>
      {renderTemplate()}
    </div>
  );
};

export default ResumeTemplateRenderer;
