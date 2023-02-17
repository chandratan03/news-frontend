import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth";
import { HTTP_CREATED, HTTP_UNAUTHORIZED } from "../../constants/common";
import AuthContext from "../../contexts/AuthContext";

const useLogin = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(undefined);
    const [isSubmit, setIsSubmit] = useState(false);
    const { user, token, isAuth, setUser, setToken, setIsAuth } =
        useContext(AuthContext);

    const onLogin = async (event) => {
        event.preventDefault();
        setIsSubmit(true);
        const email = event.target.email.value;
        const password = event.target.password.value;

        let result = await login(email, password);
        if (result.status == HTTP_CREATED) {
            let data = result.data.data;

            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("token", data.token);

            setUser(sessionStorage.getItem("user"));
            setToken(sessionStorage.getItem("token"));
            setIsAuth(
                sessionStorage.getItem("user") != null &&
                    sessionStorage.getItem("token") != null
            );
            axios.defaults.headers.common = {
                Authorization: `Bearer ${token}`,
            };

            navigate("/");
            navigate(0);
        } else if (result.status == HTTP_UNAUTHORIZED) {
            setErrorMsg(result.data.message);
        }
        setIsSubmit(false);
    };

    return {
        errorMsg,
        setErrorMsg,
        onLogin,
        isSubmit,
    };
};

export default useLogin;
