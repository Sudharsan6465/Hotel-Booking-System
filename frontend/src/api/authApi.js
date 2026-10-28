import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    "/api/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(
    "/api/auth/login",
    credentials
  );

  return response.data;
};

export const getUserById = async (userId) => {
  const response = await axiosInstance.get(
    `/api/auth/${userId}`
  );

  return response.data;
};