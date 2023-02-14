import axios from "axios";
import { NEWS_V1 } from "../constants/api";

export function getNews(params) {
    return axios.get(NEWS_V1, { params: params });
}
