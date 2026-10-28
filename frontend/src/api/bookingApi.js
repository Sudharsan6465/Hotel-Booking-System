import axiosInstance from "./axiosInstance";

export const createBooking = async (bookingData) => {
    const response = await axiosInstance.post(
        "/api/bookings",
        bookingData
    );

    return response.data;
};

export const getBookingsByUser = async (userId) => {
    const response = await axiosInstance.get(
        `/api/bookings/user/${userId}`
    );

    return response.data;
};

export const cancelBooking = async (bookingId) => {
    const response = await axiosInstance.delete(
        `/api/bookings/${bookingId}`
    );

    return response.data;
};