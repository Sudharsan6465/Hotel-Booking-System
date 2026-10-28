import axiosInstance from "./axiosInstance";

export const addReview = async (reviewData) => {

  const response = await axiosInstance.post(
    "/api/reviews",
    reviewData
  );

  return response.data;
};

export const updateReview = async (
  reviewId,
  reviewData
) => {

  const response = await axiosInstance.put(
    `/api/reviews/${reviewId}`,
    reviewData
  );

  return response.data;
};

export const getReviewsByUser = async (
  userId
) => {

  const response = await axiosInstance.get(
    `/api/reviews/user/${userId}`
  );

  return response.data;
};

export const getReviewsByRoom = async (
  roomId
) => {

  const response = await axiosInstance.get(
    `/api/reviews/room/${roomId}`
  );

  return response.data;
};

export const getAllReviews = async () => {

  const response = await axiosInstance.get(
    "/api/reviews"
  );

  return response.data;
};

export const getReviewById = async (
  reviewId
) => {

  const response = await axiosInstance.get(
    `/api/reviews/${reviewId}`
  );

  return response.data;
};


export const deleteReview = async (
  reviewId
) => {

  const response = await axiosInstance.delete(
    `/api/reviews/${reviewId}`
  );

  return response.data;
};