import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const UploadModule = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the upload to a backend
    toast({
      title: "Module uploaded",
      description: "Your module has been successfully uploaded",
    });
    navigate(`/content/${courseType}`);
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload Module</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Module Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="courseType" className="block text-sm font-medium text-gray-700">
              Course Type
            </label>
            <Input
              id="courseType"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              placeholder="e.g., javascript, python, react"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload Files
            </label>
            <Input
              id="file"
              type="file"
              multiple
              className="mt-1"
            />
          </div>
          
          <Button type="submit" className="w-full">
            Upload Module
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadModule;