import axios from "axios";
import config from "../config.json";

export async function loadUserData(id: number | string) {
    try {
        return await axios.get(`${config.GATEWAY_URL}/users/${id}`);
    } catch (e) {
        return null;
    }
}
