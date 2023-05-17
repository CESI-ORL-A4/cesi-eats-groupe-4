import axios from "axios";
import config from "@/config.json";

export async function getOrderReadytoship() {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/orders/ready-to-ship`, {
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

export async function getInProcessDeliveries(userId:string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/deliverers/${userId}/deliveries/in-process`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data);
            return null;
        }
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getDeliveries(userId:string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/deliverers/${userId}/deliveries`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data);
            return null;
        }
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export async function deliveriePickedUp(notificationId:string) {
    try {
        const response = await axios.post(`${config.GATEWAY_URL}/deliveries/${notificationId}/picked-up`,{}, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data);
            return null;
        }
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export async function deliverieDelivered(deliveryId:string) {
    try {
        const response = await axios.post(`${config.GATEWAY_URL}/deliveries/${deliveryId}/delivered`,{}, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data);
            return null;
        }
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

type addDeliveryPayload = {
    delivererId: string;
    orderId: string;
}

export async function addDelivery(formData:addDeliveryPayload) {
    try {
        const response = await axios.post(`${config.GATEWAY_URL}/deliveries`,formData, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data);
            return null;
        }
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

