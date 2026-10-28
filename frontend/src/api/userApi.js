import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {

  const response = await axiosInstance.get(
    "/api/users"
  );

  return response.data;
};

export const getUserById = async (userId) => {

  const response = await axiosInstance.get(
    `/api/users/${userId}`
  );

  return response.data;
};
export const deleteUser = async (userId) => {

  const response = await axiosInstance.delete(
    `/api/users/${userId}`
  );

  return response.data;
};