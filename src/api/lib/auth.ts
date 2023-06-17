import { axiosClient } from "../apiClient";

export function signUp(email: string, password: string) {
    return axiosClient.post("/auth/signup", {
        email,
        password,
    });
}

export function signIn(email: string, password: string) {
    return axiosClient.post("/auth/signin", {
        email,
        password,
    });
}
