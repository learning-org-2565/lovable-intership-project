import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Project Showcase</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Automated CI/CD Pipeline</CardTitle>
                <CardDescription>Project #{i}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  A comprehensive CI/CD pipeline using GitHub Actions, Docker, and AWS.
                </p>
                <div className="flex gap-2">
                  <Badge>DevOps</Badge>
                  <Badge variant="outline">AWS</Badge>
                  <Badge variant="outline">Docker</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;