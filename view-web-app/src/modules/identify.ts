import axios from "axios";
import config from "../config.json";

export async function loginAPI(email: string, password: string) {
    try {
        //API hors docker : http://localhost:8090/login
        const response = await axios.post(`${config.GATEWAY_URL}/auth/login`, {
            email,
            password
        })
        if (response.status == 200) {
            localStorage.setItem('jwt', response?.data?.accessToken);
            localStorage.setItem('id', response?.data?.id);
            localStorage.setItem('role', response?.data?.role);
            console.log(response.data)

            return {role: response?.data?.role};
        }
        // Don't forget to return something
        return {"error": response.statusText}
    } catch (err) {
        console.error(err);
    }
}
