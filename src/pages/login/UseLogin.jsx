import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth";

const useLogin = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(undefined);

    const onLogin = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        let result = await login(email, password);
        if(result.status === 201){
            let data = result.data.data;
            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("token", data.token);
            navigate("/");
        }else if(result.status === 401){
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
