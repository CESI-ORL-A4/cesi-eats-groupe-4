import articleValidator from "../validators/article/articleValidator";
import articleModel from "../model/articleModel";
import AddArticlePayload from "../types/article/AddArticlePayload";
import {uploadImage} from "../image/uploadImage";
import UploadArticlePayload from "../types/article/UploadArticlePayload";
import {getRestaurant} from "./restaurantController";
import UpdateArticlePayload from "../types/article/UpdateArticlePayload";


export async function createArticle(payload: AddArticlePayload,restaurantId:string, file?: any) {
    let linkImage = ""
    if (payload.imageName)
        linkImage = uploadImage(file,payload.imageName);
    let restaurant = await getRestaurant(payload.restaurantId);
    let article:any;
    article.linkImage = linkImage;
    restaurant.articles.push(article);
    await restaurant.save();
    return restaurant;
}

export async function deleteArticle(restaurantId: string,articleId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const articles= restaurant.articles;
    if (articles)
        articles.filter(article => article.id !== articleId);
    await restaurant.save();
    return restaurant;
}

export async function isArticleDeletable() {
    const result = false;
    //TODO faire quand menu seront fait
}

export async function updateArticle(restaurantId: string,articleId: string,payload:UpdateArticlePayload,file?:any) {
    const restaurant = await getRestaurant(restaurantId);
    const articles= restaurant.articles;
    if (articles){
        let article = articles.find(_article => _article.id == articleId);
        let linkImage = ""
        if (payload.imageName)
            linkImage = uploadImage(file,payload.imageName);
        article = payload;
        article.image = linkImage;
        await restaurant.save();
        return restaurant;
    }
    return false;
}
/*
export async function updateArticle(payload: any,id:string){
    if(payload.ownerId)
        ({ ownerId: payload.ownerId, ...payload } = payload);
    if (payload.imageName && payload.imageData){
        const linkImage = uploadImage(payload.imageData,payload.imageName);
        ({ imageData: payload.imageData,imageName: payload.imageName, ...payload } = payload);
        payload.linkImage = linkImage;
    }
    return await articleModel.updateOne({ _id: id }, payload);
}

export async function deleteArticle(id: string) {
    return await articleModel.deleteOne({ _id: id });
}*/

export async function getArticle(restaurantId: string,articleId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const articles= restaurant.articles;
    if (articles){
        return articles.find(article => article.id == articleId);
    }
    return null;
}

export async function getArticles(restaurantId:string) {
    const restaurant = await getRestaurant(restaurantId);
    return restaurant.articles;
}

export async function articleExist(restaurantId: string,articleId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const articles= restaurant.articles;
    if (articles){
        return !!articles.find(article => article.id == articleId);
    }
    return false;
}

export function isArticleUpdateGoodFormat(payload: UploadArticlePayload) {
    return menuUpdateValidator.validate(payload);
}

export function isArticleGoodFormat(payload: AddArticlePayload) {
    return articleValidator.validate(payload);
}
