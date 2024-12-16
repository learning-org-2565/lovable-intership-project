import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">DevLoveOps</h3>
            <p className="text-gray-400">
              Empowering the next generation of DevOps engineers through hands-on learning.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-gray-400 hover:text-white">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-gray-400 hover:text-white">
                  Apply
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-white">
                  Admin
                </Link>
              </li>
              
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@devloveops.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;