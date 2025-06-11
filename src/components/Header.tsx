
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 md:px-10 bg-white shadow-sm">
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl font-bold gradient-text">ResumeAI</h1>
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-resume-purple transition-colors">
          Home
        </Link>
        <Link to="/path-selection" className="text-gray-600 hover:text-resume-purple transition-colors">
          Templates
        </Link>
        <a href="#features" className="text-gray-600 hover:text-resume-purple transition-colors">
          Features
        </a>
      </nav>
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" className="hidden md:inline-flex">
          <Link to="/path-selection">Sign In</Link>
        </Button>
        <Button asChild className="bg-resume-green hover:bg-resume-green/90">
          <Link to="/path-selection">Get Started</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
