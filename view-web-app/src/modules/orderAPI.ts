import axios from "axios";
import config from "@/config.json";

export async function getOrderByUserId(userId:string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/users/${userId}/orders`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getOrderHistoryByRestaurantId(restaurantId:string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/restaurants/${restaurantId}/orders/history`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        return response.data;
    } catch (err) {
        console.error(err);
    }
}
