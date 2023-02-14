import React from "react";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({ child }) => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [isAuth, setIsAuth] = useState(
        user !== undefined && token !== undefined
    );
    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuth,
                setUser,
                setToken,
                setIsAuth,
            }}
        >
            {child}
        </AuthContext.Provider>
    );
};


export default AuthProvider;