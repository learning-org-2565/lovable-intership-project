import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            DevLoveOps
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link to="/internships" className="text-gray-600 hover:text-primary">
              Internships
            </Link>
            <Link to="/apply" className="text-gray-600 hover:text-primary">
              Apply
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-primary">
              Blog
            </Link>
            <Link to="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>    
        </div>
      </div>
    </nav>
  );
};

export default Navbar;