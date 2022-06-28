import FormData from "form-data";
import axios from "axios";
import config from "../config.json";

export async function getMenus(restaurantsId:string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/catalog/restaurants/`+restaurantsId+"/menus", {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.menus;
    } catch (err) {
        console.error(err);
    }
}

export async function getMenu(restaurantsId:string,menuId:string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/catalog/restaurants/`+restaurantsId+"/menus/"+menuId, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.menu;
    } catch (err) {
        console.error(err);
    }
}

export async function deleteMenu(restaurantsId:string,menuId:string) {
    try {
        const response = await axios.delete(`${config.GATEWAY_URL}/catalog/restaurants/`+restaurantsId+"/menus/"+menuId, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.menuId;
    } catch (err) {
        console.error(err);
    }
}

export async function addMenu(restaurantsId:string,form:FormData) {
    try {
        const response = await axios.post(`${config.GATEWAY_URL}/catalog/restaurants/`+restaurantsId+"/menus/",form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.menu;
    } catch (err) {
        console.error(err);
    }
}

export async function updateMenu(restaurantsId:string,menuId:string,form:FormData) {
    try {
        const response = await axios.put(`${config.GATEWAY_URL}/catalog/restaurants/`+restaurantsId+"/menus/"+menuId,form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status < 200 || response.status > 300) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.menu;
    } catch (err) {
        console.error(err);
    }
}