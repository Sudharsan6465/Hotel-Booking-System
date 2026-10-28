import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },

  (error) => {

    return Promise.reject(error);

  }
);

axiosInstance.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    const status =
      error.response?.status;


    if (status === 401) {

      console.log(
        "Session expired. Logging out..."
      );


      localStorage.removeItem("token");

      localStorage.removeItem("userId");

      localStorage.removeItem("userName");

      localStorage.removeItem("email");

      localStorage.removeItem("role");


      if (
        window.location.pathname !==
        "/login"
      ) {

        window.location.href =
          "/login";

      }

    }

    if (status === 403) {

      console.log(
        "Access denied."
      );

    }


    return Promise.reject(error);

  }
);


export default axiosInstance; 