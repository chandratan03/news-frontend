import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth";
import AuthContext from "../../contexts/AuthContext";

const useLogin = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(undefined);
    const { user, token, isAuth, setUser, setToken, setIsAuth } =
        useContext(AuthContext);

    const onLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        let result = await login(email, password);
        if (result.status === 201) {
            let data = result.data.data;

            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("token", data.token);

            setUser(sessionStorage.getItem("user"));
            setToken(sessionStorage.getItem("token"));
            setIsAuth(
                sessionStorage.getItem("user") &&
                    sessionStorage.getItem("token")
            );
            axios.defaults.headers.common = {
                Authorization: `Bearer ${token}`,
            };

            navigate("/");
            navigate(0);
        } else if (result.status === 401) {
            setErrorMsg(result.data.message);
        }
    };

    return {
        errorMsg,
        setErrorMsg,
        onLogin,
    };
};

export default useLogin;
