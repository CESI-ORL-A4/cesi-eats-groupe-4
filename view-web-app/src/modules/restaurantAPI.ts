import FormData from "form-data";
import axios from "axios";

export async function getRestaurantByOwnerId(ownerId:string) {
    try {
        const response = await axios.get('http://localhost:8080/catalog/restaurants/ownerId/'+ownerId, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status == 200) {
            console.log(response);
            console.log(response.data.error);
        }
        // Don't forget to return something
        return response.data.restaurants;
    } catch (err) {
        console.error(err);
    }
}