import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const navigate = useNavigate();

  // For toggling the "Upload Module" form
  const [showUploadForm, setShowUploadForm] = useState(false);

  // State for module form fields
  const [moduleTitle, setModuleTitle] = useState("");
  const [courseType, setCourseType] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build form data
    const formData = new FormData();
    formData.append("module_title", moduleTitle);
    formData.append("course_type", courseType);
    formData.append("description", description);

    if (files) {
      // If multiple files selected, append each
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    try {
      const response = await axios.post("http://localhost:9002/upload_module", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload success:", response.data);
      alert("Module uploaded successfully!");
      // Clear form fields
      setModuleTitle("");
      setCourseType("");
      setDescription("");
      setFiles(null);
      setShowUploadForm(false);
    } catch (error) {
      console.error("Error uploading module:", error);
      alert("Failed to upload module!");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upload Module Card toggles the form */}
          <Card
            className="cursor-pointer"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            <CardHeader>
              <CardTitle>Upload Module</CardTitle>
              <CardDescription>Add new course content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Click to upload new modules</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer" onClick={() => navigate("/content/all")}>
            <CardHeader>
              <CardTitle>View Content</CardTitle>
              <CardDescription>Browse uploaded modules</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                View and manage course content
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Manage project showcase</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-500">Active projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage blog content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-gray-500">Published posts</p>
            </CardContent>
          </Card>
        </div>

        {/* Conditionally render the "Upload Module" form below the cards */}
        {showUploadForm && (
          <div className="mt-8 p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upload Module</h2>
            <form onSubmit={handleSubmit}>
              {/* Module Title */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Module Title</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  required
                />
              </div>
              {/* Course Type */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Course Type</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="e.g. javascript, python, react"
                  value={courseType}
                  onChange={(e) => setCourseType(e.target.value)}
                  required
                />
              </div>
              {/* Description */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  className="border border-gray-300 rounded w-full p-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* Upload Files */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Upload Files</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                  "
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
              >
                Upload Module
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
