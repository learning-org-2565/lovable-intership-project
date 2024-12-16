import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary to-secondary pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Launch Your DevOps Career
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join our comprehensive internship programs and master the art of DevOps with
              hands-on experience and expert mentorship.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/apply">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/internships">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
            <div className="w-48 h-48 animate-float">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-white"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;