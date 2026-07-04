import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};

const ADMIN_API_URL = "http://localhost:5000/api/admin";

export const loginAdmin = async (loginData) => {

  const response = await axios.post(

    `${ADMIN_API_URL}/login`,

    loginData

  );

  return response.data;

};
export const getComplaints = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/api/complaints",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};