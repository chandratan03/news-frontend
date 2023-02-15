import axios from "axios";
import {
    LOGIN_V1_URL,
    REGISTER_V1_URL,
    UPDATE_ACCOUNT_V1_URL,
} from "../constants/api";
import { customAxios } from "./axios";

export function login(email, password) {
    let result = undefined;
    result = axios
        .post(LOGIN_V1_URL, { email, password })
        .catch(function (error) {
            console.error(error);
            return error.response;
        });
    return result;
}

export function register(
    firstName,
    lastName,
    email,
    password,
    confirmPassword
) {
    return axios
        .post(REGISTER_V1_URL, {
            first_name: firstName ? firstName : null,
            last_name: lastName ? lastName : null,
            email: email ? email : null,
            password: password ? password : null,
            password_confirmation: confirmPassword ? confirmPassword : null,
        })
        .catch(function (error) {
            console.error(error);
            return error.response;
        });
}

export function updateAccount(
    firstName,
    lastName,
    password,
    confirmPassword,
    image
) {
    return customAxios
        .post(
            UPDATE_ACCOUNT_V1_URL,
            {
                first_name: firstName ? firstName : null,
                last_name: lastName ? lastName : null,
                password: password ? password : null,
                password_confirmation: confirmPassword ? confirmPassword : null,
                image: image ? image : null,
            },
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        )
        .catch(function (error) {
            console.error(error);
            return error.response;
        });
}
