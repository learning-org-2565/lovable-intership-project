import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CourseContent = () => {
  const { courseType } = useParams();

  // This would typically fetch data from a backend
  const mockContent = [
    {
      id: 1,
      title: `${courseType} Fundamentals`,
      description: "Learn the basics and core concepts",
    },
    {
      id: 2,
      title: `Advanced ${courseType}`,
      description: "Deep dive into advanced topics",
    },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 capitalize">{courseType} Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockContent.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Click to view course content
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;