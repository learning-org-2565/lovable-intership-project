import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InternshipPrograms from "@/components/InternshipPrograms";

const Internships = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <InternshipPrograms />
      </div>
      <Footer />
    </div>
  );
};

export default Internships;