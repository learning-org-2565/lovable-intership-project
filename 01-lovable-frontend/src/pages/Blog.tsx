import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Blog = () => {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">DevOps Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Getting Started with Kubernetes</CardTitle>
                <CardDescription>Posted on March {i}, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn the fundamentals of container orchestration with Kubernetes
                  and how it can revolutionize your deployment strategy.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;