import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { getInternships, enrollUser } from "@/lib/api";
import Internships from "@/pages/Internships";


interface Internship {
  id: string;
  title: string;
  description: string;
  price: number;
}


const programs = [
  {
    id: "basic",
    title: "Basic DevOps Internship",
    price: "$499",
    description: "Perfect for beginners looking to start their DevOps journey",
    features: [
      "Introduction to DevOps principles",
      "Basic Git and Version Control",
      "CI/CD fundamentals",
      "Docker basics",
      "24/7 community support",
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate DevOps Internship",
    price: "$799",
    description: "For those ready to take their DevOps skills to the next level",
    features: [
      "Advanced Git workflows",
      "Kubernetes deployment",
      "Infrastructure as Code",
      "Monitoring and logging",
      "One-on-one mentoring",
    ],
  },
  {
    id: "advanced",
    title: "Advanced DevOps Internship",
    price: "$1299",
    description: "Master advanced DevOps practices and cloud technologies",
    features: [
      "Cloud architecture design",
      "Security best practices",
      "Microservices architecture",
      "Performance optimization",
      "Career placement assistance",
    ],
  },
];

const InternshipPrograms = () => {
  const navigate = useNavigate();

  // const handleEnrollClick = (program: typeof programs[0]) => {
  //   // For now, we'll just redirect to sign in since we don't have auth yet
  //   toast.info("Please sign in to continue enrollment");
  //   navigate("/signin", { 
  //     state: { 
  //       returnTo: "/apply",
  //       programId: program.id 
  //     } 
  //   });
  // };
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInternships()
      .then((data) => setInternships(data))
      .catch((error) => console.error("Error fetching internships:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleEnroll = (internshipId: string) => {
    const userId = "sample-user-123"; // Replace with real user ID
    enrollUser(userId, internshipId)
      .then(() => alert("Enrollment Successful!"))
      .catch(() => alert("Error enrolling in internship"));
  };

  if (loading) return <p>Loading internships...</p>;

  

  return (
    
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Internship Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card key={program.title} className="relative">
              <CardHeader>
                <CardTitle>{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-6">
                  {program.price}
                  <button onClick={() => handleEnroll(program.id)}>Enroll Now</button>
                </div>
                <ul className="space-y-3">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternshipPrograms;