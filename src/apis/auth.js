import axios from "axios";
import { LOGIN_V1_URL, REGISTER_V1_URL } from "../constants/api";

export function login(email, password) {
    let result = undefined;
    result = axios
        .post(LOGIN_V1_URL, { email, password })
        .catch(function (error) {
            console.error(error)
            return error.response
        });
    return result;
}

export function register(name, email, password, confirmPassword) {
    return axios.post(REGISTER_V1_URL, {
        name,
        email,
        password,
        confirmPassword,
    });
}
