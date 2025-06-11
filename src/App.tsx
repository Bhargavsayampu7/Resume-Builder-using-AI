
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./contexts/ResumeContext";
import Landing from "./pages/Landing";
import PathSelection from "./pages/PathSelection";
import ExperienceSelection from "./pages/ExperienceSelection";
import Templates from "./pages/Templates";
import ResumeBuilder from "./pages/ResumeBuilder";
import NotFound from "@/pages/NotFound";
import { PDFTest } from "@/components/pdf-resume/PDFTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ResumeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/path-selection" element={<PathSelection />} />
            <Route path="/experience-selection" element={<ExperienceSelection />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/builder" element={<ResumeBuilder />} />
            <Route path="/pdf-test" element={<PDFTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ResumeProvider>
  </QueryClientProvider>
);

export default App;
