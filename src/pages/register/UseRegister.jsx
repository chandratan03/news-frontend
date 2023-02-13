import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../apis/auth";

export default function useRegister() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(undefined);

    const onRegister = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.password_confirmation.value;

        let result = await register(name, email, password, confirmPassword);
        if (result.status === 201) {
            let data = result.data.data;
            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("token", data.token);
            navigate("/");
        } else {
            setErrorMsg(result.data.message);
        }
    };

    return {
        errorMsg,
        setErrorMsg,
        onRegister,
    };
}
