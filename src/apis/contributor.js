import { CONTRIBUTOR_V1, RANDOM_CONTRIBUTOR_V1 } from "../constants/api";
import { customAxios } from "./axios";

export function getRandomContributors() {
    return customAxios.get(RANDOM_CONTRIBUTOR_V1);
}

export function getAuthor(id) {
    return customAxios.get(CONTRIBUTOR_V1 + "/" + id);
}
