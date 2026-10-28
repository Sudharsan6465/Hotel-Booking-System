import axiosInstance from "./axiosInstance";

export const getAllBookings = async () => {
  const response = await axiosInstance.get("/api/bookings");
  return response.data;
};

export const getBookingById = async (bookingId) => {
  const response = await axiosInstance.get(
    `/api/bookings/${bookingId}`
  );

  return response.data;
};

export const updateBookingStatus = async (
  bookingId,
  status
) => {
  const response = await axiosInstance.put(
    `/api/bookings/${bookingId}/status`,
    null,
    {
      params: {
        status,
      },
    }
  );

  return response.data;
};