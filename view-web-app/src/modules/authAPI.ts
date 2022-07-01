import useGlobalStore, { type State } from "@/stores/store";
import axios from "axios";
import type { Store } from "vuex";
import config from "../config.json";

export async function loginAPI(email: string, password: string) {
    try {
        const response = await axios.post(`${config.GATEWAY_URL}/auth/login`, {
            email,
            password
        })
        if (response.status == 200) {
            localStorage.setItem('jwt', response?.data?.accessToken);
            localStorage.setItem('userId', response?.data?.id);
            localStorage.setItem('role', response?.data?.role);
            return {role: response?.data?.role, id: response?.data?.id};
        }
        // Don't forget to return something
        return {"error": response.statusText}
    } catch (err) {}
}

export async function logoutAPI(store: Store<State>) {
    try {
        await axios.delete(`${config.GATEWAY_URL}/auth/logout`);
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        store.commit("clearUserData");
    } catch (e) {}
}
