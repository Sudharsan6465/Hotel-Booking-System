import axiosInstance from "./axiosInstance";

export const makePayment = async (paymentData) => {

    const response = await axiosInstance.post(
        "/api/payments",
        paymentData
    );

    return response.data;
};


export const getPaymentByBooking = async (bookingId) => {

    const response = await axiosInstance.get(
        `/api/payments/booking/${bookingId}`
    );

    return response.data;
};