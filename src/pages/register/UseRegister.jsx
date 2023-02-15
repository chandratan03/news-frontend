import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../apis/auth";

export default function useRegister() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(undefined);

    const onRegister = async (event) => {
        event.preventDefault();

        const firstName = event.target.first_name.value;
        const lastName = event.target.last_name.value;
        
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.password_confirmation.value;

        let result = await register(firstName, lastName, email, password, confirmPassword);
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
