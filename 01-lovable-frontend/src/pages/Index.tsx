import Hero from "@/components/Hero";
import InternshipPrograms from "@/components/InternshipPrograms";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DevOpsLifecycle from "@/components/DevOpsLifecycle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <DevOpsLifecycle />
      <InternshipPrograms />
      <Footer />
    </div>
  );
};

export default Index;