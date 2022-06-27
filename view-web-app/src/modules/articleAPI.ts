import FormData from "form-data";
import axios from "axios";
export async function getArticles(restaurantsId:string) {
    try {
        const response = await axios.get('http://localhost:8080/catalog/restaurants'+restaurantsId+"/articles", {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.articles;
    } catch (err) {
        console.error(err);
    }
}

export async function getArticle(restaurantsId:string,articleId:string) {
    try {
        const response = await axios.get('http://localhost:8080/catalog/restaurants'+restaurantsId+"/articles/"+articleId, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.article;
    } catch (err) {
        console.error(err);
    }
}

export async function deleteArticle(restaurantsId:string,articleId:string) {
    try {
        const response = await axios.delete('http://localhost:8080/catalog/restaurants'+restaurantsId+"/articles/"+articleId, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.articleId;
    } catch (err) {
        console.error(err);
    }
}

export async function addArticle(restaurantsId:string,form:FormData) {
    try {
        const response = await axios.post('http://localhost:8080/catalog/restaurants'+restaurantsId+"/articles/",form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.article;
    } catch (err) {
        console.error(err);
    }
}

export async function updateArticle(restaurantsId:string,articleId:string,form:FormData) {
    try {
        const response = await axios.put('http://localhost:8080/catalog/restaurants'+restaurantsId+"/articles/"+articleId,form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },})
        if (response.status != 200) {
            console.log(response);
            console.log(response.data.error);
            return null;
        }
        // Don't forget to return something
        return response.data.article;
    } catch (err) {
        console.error(err);
    }
}