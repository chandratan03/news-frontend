import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const NonAuth = ({ children }) => {
    const { user, token, isAuth, setUser, setToken, setIsAuth } =
        useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/");
            navigate(0);
        }
    });

    return children;
};
export default NonAuth;
