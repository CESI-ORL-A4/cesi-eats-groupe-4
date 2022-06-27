import FormData from "form-data";
import axios from "axios";
export async function getMenus(restaurantsId:string) {
    try {
        const response = await axios.get('http://localhost:8080/catalog/restaurants'+restaurantsId+"/menus", {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
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
        const response = await axios.get('http://localhost:8080/catalog/restaurants'+restaurantsId+"/menus/"+menuId, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
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
        const response = await axios.delete('http://localhost:8080/catalog/restaurants'+restaurantsId+"/menus/"+menuId, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
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
        const response = await axios.post('http://localhost:8080/catalog/restaurants'+restaurantsId+"/menus/",form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
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
        const response = await axios.put('http://localhost:8080/catalog/restaurants'+restaurantsId+"/menus/"+menuId,form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
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