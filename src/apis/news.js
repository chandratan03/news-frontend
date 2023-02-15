import axios from "axios";
import { NEWS_CATEGORY_V1_URL, NEWS_V1 } from "../constants/api";

export function getNews(params) {
    return axios.get(NEWS_V1, { params: params });
}

export function getNewsCategories() {
    return axios.get(NEWS_CATEGORY_V1_URL).catch(() => []);
}
