import axios from "axios";
import { BASE_URL } from "../constants/api";
export const customAxios = axios.create({
    headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
});


