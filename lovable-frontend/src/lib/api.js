import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

// Fetch list of internships
export const getInternships = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/internships`);
    return response.data;
  } catch (error) {
    console.error("Error fetching internships:", error);
    throw error;
  }
};

// Enroll a user in an internship
export const enrollUser = async (userId, internshipId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/enroll`, {
      user_id: userId,
      internship_id: internshipId,
    });
    return response.data;
  } catch (error) {
    console.error("Error enrolling user:", error);
    throw error;
  }
};
