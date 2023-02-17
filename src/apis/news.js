import axios from "axios";
import { NEWS_CATEGORY_V1_URL, NEWS_V1, PERSONALIZE_NEWS_V1 } from "../constants/api";
import { customAxios } from "./axios";

export function getNews(params) {
    return axios.get(NEWS_V1, { params: params });
}

export function getNewsByAccount(params) {
    return customAxios.get(PERSONALIZE_NEWS_V1, { params: params });
}



export function getNewsCategories() {
    return axios.get(NEWS_CATEGORY_V1_URL).catch(() => []);
}
