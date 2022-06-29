import axios from "axios";
import config from "@/config.json";

export async function getNotifications(userId:string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}"/users/${userId}/notifications"`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.notifications;
    } catch (err) {
        console.error(err);
    }
}
export async function deleteNotification(notificationId: string) {
    try {
        const response = await axios.delete(`${config.GATEWAY_URL}/notifications/${notificationId}/`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response;
    } catch (err) {
        console.error(err);
    }
}
export async function deleteAllNotification(userId: string) {
    try {
        const response = await axios.delete(`${config.GATEWAY_URL}/users/${userId}/notifications/`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response;
    } catch (err) {
        console.error(err);
    }
}
export async function makeNotificationsRead(userId: string) {
    try {
        const response = await axios.post(`${config.GATEWAY_URL}/users/${userId}/notifications/makeread/`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response;
    } catch (err) {
        console.error(err);
    }
}
