import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role");


        if (token && userId && role) {

            setUser({
                token,
                userId: Number(userId),
                userName,
                email,
                role,
            });

        }

        setLoading(false);

    }, []);

    const login = async (credentials) => {

        const data = await loginUser(credentials);

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "userId",
            data.userId
        );

        localStorage.setItem(
            "userName",
            data.userName
        );
        localStorage.setItem(
            "email",
            credentials.email
        );

        localStorage.setItem(
            "role",
            data.role
        );

        setUser({

            token: data.token,

            userId: Number(data.userId),

            userName: data.userName,

            email: credentials.email,

            role: data.role,

        });


        return data;

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("userId");

        localStorage.removeItem("userName");

        localStorage.removeItem("email");

        localStorage.removeItem("role");

        setUser(null);

    };


    return (

        <AuthContext.Provider
            value={{
                user,

                loading,

                login,

                logout,

                isAuthenticated: !!user,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}
export function useAuth() {

    return useContext(AuthContext);

}