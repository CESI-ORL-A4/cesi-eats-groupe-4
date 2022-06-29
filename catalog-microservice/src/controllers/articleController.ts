import articleValidator from "../validators/article/articleValidator";
import articleModel from "../model/articleModel";
import AddArticlePayload from "../types/article/AddArticlePayload";
import {uploadImage} from "../image/uploadImage";
import UploadArticlePayload from "../types/article/UploadArticlePayload";
import {getRestaurant} from "./restaurantController";
import UpdateArticlePayload from "../types/article/UpdateArticlePayload";
import menuUpdateValidator from "../validators/menu/menuUpdateValidator";
import mongoose from "mongoose";
import ArticleType from "../types/article/ArticleType";
import MenuType from "../types/menu/MenuType";


export async function createArticle(payload: AddArticlePayload,restaurantId:string) {
    let restaurant = await getRestaurant(restaurantId);
    payload._id  = new mongoose.Types.ObjectId();
    console.log(payload);
    restaurant.articles.push(payload);
    await restaurant.save();
    return payload._id.toString();
}

export async function deleteArticle(restaurantId: string,articleId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const articles= restaurant.articles;
    if (articles)
    {
        const findIndex = articles.filter((article: { id: string; }) => article.id !== articleId);
        articles.splice(findIndex,1);
    }

    await restaurant.save();
    return articleId;
}

export async function isArticleDeletable(restaurantId: string,articleId: string) {
    const articles = getArticles(restaurantId);
    for (let article in articles){
        if (article == articleId)
            return false;
    }
    return true;
}

export async function updateArticle(restaurantId: string,articleId: string,payload:UpdateArticlePayload) {
    const restaurant = await getRestaurant(restaurantId);
    const articles= restaurant.articles;
    if (articles){
        let article = articles.find((_article:ArticleType) => _article._id == articleId);
        let articleIndex = articles.findIndex((_article:ArticleType) => _article._id == articleId);
        article = payload;
        article._id = new mongoose.Types.ObjectId(articleId);
        articles.splice(articleIndex,1)
        articles.push(article);
        await restaurant.save();
        return article._id;
    }
    return false;
}

export async function getArticle(restaurantId: string,articleId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const articles= restaurant.articles;
    console.log(articles);
    console.log(articleId);
    if (articles){
        // @ts-ignore
        const article = articles.find((article: ArticleType) => article._id.toString() == articleId);
        console.log("articles get");
        console.log(article);
        return article;
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
    console.log(articles);
    if (articles){
        return !!articles.find((article: { _id: mongoose.Types.ObjectId; }) => article._id.toString() == articleId);
    }
    return false;
}

export function isArticleUpdateGoodFormat(payload: UploadArticlePayload) {
    return articleValidator.validate(payload);
}

export function isArticleGoodFormat(payload: AddArticlePayload) {
    return articleValidator.validate(payload);
}
