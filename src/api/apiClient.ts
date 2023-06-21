import axios from "axios";
import { TOKEN } from "common/utils/constants";

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(TOKEN);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
