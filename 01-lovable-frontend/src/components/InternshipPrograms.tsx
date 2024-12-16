import React from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Hardcoded internship data
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
  const handleEnroll = (programId: string) => {
    alert(`Enrolling in ${programId} internship!`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Internship Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card key={program.id} className="relative">
              <CardHeader>
                <CardTitle>{program.title}</CardTitle>
                <p>{program.description}</p>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-6">
                  {program.price}
                </div>
                <ul className="space-y-2 mb-4">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleEnroll(program.id)}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternshipPrograms;
