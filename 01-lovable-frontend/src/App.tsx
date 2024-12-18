import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InternshipPrograms from "./pages/Internships";
import ApplicationForm from "./components/ApplicationForm";
import SignIn from "./pages/SignIn";
import Blog from "./pages/Blog";
import AdminLogin from "@/pages/AdminLogin";
import Admin from "@/pages/Admin";
import UploadModule from "./pages/UploadModule";
import CourseContent from "./pages/CourseContent";
import Projects from "./pages/Projects";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/internships" element={<InternshipPrograms />} />
            <Route path="/application" element={<ApplicationForm />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/upload-module" element={<UploadModule />} />
            <Route path="/admin/content/:courseType" element={<CourseContent />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
