import axiosInstance from "./axiosInstance";

export const getAllRooms = async () => {
    const response = await axiosInstance.get("/api/rooms");
    return response.data;
};

export const getRoomById = async (roomId) => {
    const response = await axiosInstance.get(`/api/rooms/${roomId}`);
    return response.data;
};

export const getAvailableRooms = async () => {
    const response = await axiosInstance.get("/api/rooms/available");
    return response.data;
};

export const addRoom = async (roomData) => {
    const response = await axiosInstance.post(
        "/api/rooms",
        roomData
    );

    return response.data;
};

export const updateRoom = async (roomId, roomData) => {
    const response = await axiosInstance.put(
        `/api/rooms/${roomId}`,
        roomData
    );

    return response.data;
};

export const deleteRoom = async (roomId) => {
    const response = await axiosInstance.delete(
        `/api/rooms/${roomId}`
    );

    return response.data;
};