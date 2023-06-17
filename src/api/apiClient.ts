import axios from "axios";

const BASE_URL = `https://www.pre-onboarding-selection-task.shop/`;

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
