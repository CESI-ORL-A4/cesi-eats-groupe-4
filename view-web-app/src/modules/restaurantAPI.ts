import FormData from "form-data";
import axios from "axios";

export async function getRestaurantByOwnerId(ownerId:string) {
    try {
        const response = await axios.get('http://localhost:8080/catalog/restaurants/ownerId/'+ownerId, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        console.log(response);
        return response.data.restaurant;
    } catch (err) {
        console.error(err);
    }
}

export async function getRestaurants() {
    try {
        const response = await axios.get('http://localhost:8080/catalog/restaurants/', {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.restaurants;
    } catch (err) {
        console.error(err);
    }
}

export async function addRestaurant(form:FormData) {
    try {
        const response = await axios.post('http://localhost:8080/catalog/restaurants/', form,{
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.restaurant;
    } catch (err) {
        console.error(err);
    }
}

export async function updateRestaurant(form:FormData,restaurantId:string) {
    try {
        const response = await axios.put('http://localhost:8080/catalog/restaurants/'+restaurantId, form,{
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.restaurant;
    } catch (err) {
        console.error(err);
    }
}

export async function deleteRestaurant(form:FormData,restaurantId:string) {
    try {
        const response = await axios.delete('http://localhost:8080/catalog/restaurants/'+restaurantId,{
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.restaurantId;
    } catch (err) {
        console.error(err);
    }
}