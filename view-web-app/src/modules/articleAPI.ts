import FormData from "form-data";
import config from "../config.json";
import axios from "axios";

export async function getArticles(restaurantsId: string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/catalog/restaurants/` + restaurantsId + "/articles", {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
        })
        if (response.status < 200 || response.status > 300) {
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

export async function getArticle(restaurantsId: string, articleId: string) {
    try {
        const response = await axios.get(`${config.GATEWAY_URL}/catalog/restaurants/` + restaurantsId + "/articles/" + articleId, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
            },
        })
        if (response.status < 200 || response.status > 300) {
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

export async function deleteArticle(restaurantsId: string, articleId: string) {
    try {
        const response = await axios.delete(`${config.GATEWAY_URL}/catalog/restaurants/` + restaurantsId + "/articles/" + articleId, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
        })
        if (response.status < 200 || response.status > 300) {
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

export async function addArticle(restaurantsId: string, form: FormData) {
    try {
        const response = await axios.post(`${config.GATEWAY_URL}/catalog/restaurants/` + restaurantsId + "/articles/", form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
        })
        if (response.status < 200 || response.status > 300) {
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

export async function updateArticle(restaurantsId: string, articleId: string, form: FormData) {
    try {
        const response = await axios.put(`${config.GATEWAY_URL}/catalog/restaurants/` + restaurantsId + "/articles/" + articleId, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
        })
        if (response.status < 200 || response.status > 300) {
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
