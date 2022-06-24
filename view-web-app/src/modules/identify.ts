import axios from "axios";

export async function loginAPI(email: string, password: string) {
    try {
        const response = await axios.post('http://localhost:8090/login', {
            email,
            password
        })
        if (response.status == 200) {
            localStorage.setItem('jwt', JSON.stringify(response?.data?.token));
            localStorage.setItem('role', JSON.stringify(response?.data?.role));
            return {role: response?.data?.role};
        }
        // Don't forget to return something
        return {"error": response.statusText}
    } catch (err) {
        console.error(err);
    }
}
