import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../apis/auth";
import AuthContext from "../../contexts/AuthContext";

const useHeader = () => {
    const navigate = useNavigate();
    const { user, token, isAuth, setUser, setToken, setIsAuth } =
        useContext(AuthContext);

    const userObject = user ? JSON.parse(user) : null;
    const onLogout = async () => {
        await logout();
        setUser(null);
        setToken(null);
        setIsAuth(false);
        sessionStorage.clear();
        navigate("/");
        navigate(0);
    };

    return { userObject, isAuth, onLogout };
};

export default useHeader;
