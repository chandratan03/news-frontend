export const BASE_URL = "http://localhost:8080/api";

export const V1 = "/v1";
export const AUTH = "/auth";
export const NEWS = "/news";
export const AUTH_V1 = BASE_URL + V1 + AUTH;
export const NEWS_V1 = BASE_URL + V1 + NEWS;
export const LOGIN_V1_URL = AUTH_V1 + "/login";
export const REGISTER_V1_URL = AUTH_V1 + "/register";
export const UPDATE_ACCOUNT_V1_URL = AUTH_V1 + "/update";
export const NEWS_CATEGORY_V1_URL  = NEWS_V1 + "/category";
