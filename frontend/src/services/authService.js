import axios from "axios";
import { API } from "../config/api";

axios.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");

      // window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

const API_URL = `${API}/api/auth`;

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

const ADMIN_API_URL = `${API}/api/admin`;

export const loginAdmin = async (loginData) => {

  const response = await axios.post(

    `${ADMIN_API_URL}/login`,

    loginData

  );

  return response.data;

};

export const getAdminProfile = async () => {

  const token = localStorage.getItem("adminToken");

  const response = await axios.get(
    `${API}/api/admin/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateAdminProfile = async (data) => {

  const token = localStorage.getItem("adminToken");

  const response = await axios.put(
    "${API}/api/admin/profile",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const changeAdminPassword = async (data) => {

  const token = localStorage.getItem("adminToken");

  const response = await axios.put(
    "${API}/api/admin/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getComplaints = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    "${API}/api/complaints",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};