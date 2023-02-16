import { SOURCE_V1_URL } from "../constants/api";
import { customAxios } from "./axios";

export function getSources() {
    return customAxios.get(SOURCE_V1_URL);
}
