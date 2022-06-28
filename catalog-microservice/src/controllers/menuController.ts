import menuValidator from "../validators/menu/menuValidator";
import AddMenuPayload from "../types/menu/AddMenuPayload";
import {uploadImage} from "../image/uploadImage";
import UploadMenuPayload from "../types/menu/UploadMenuPayload";
import {getRestaurant} from "./restaurantController";
import menuModel from "../model/menuModel";
import {getArticle} from "./articleController";
import menuUpdateValidator from "../validators/menu/menuUpdateValidator";
import UpdateMenuPayload from "../types/menu/UpdateMenuPayload";
import MenuType from "../types/menu/MenuType";
import mongoose from "mongoose";
import ArticleType from "../types/article/ArticleType";
import RestaurantType from "../types/restaurant/RestaurantType";
import restaurantModel from "../model/restaurantModel";


export async function createMenu(idRestaurant:string,payload: AddMenuPayload, file?: any) {
    let linkImage = "";
    const _id = new mongoose.Types.ObjectId();
    console.log(payload);
    payload._id = _id;
    if (payload.imageName)
    {
        linkImage = await uploadImage(file,payload.imageName);
        payload.linkImage = linkImage;
    }
    const restaurant = await getRestaurant(idRestaurant);
    console.log(restaurant);
    restaurant.menus.push(payload);
    await restaurant.save();
    return _id;
}

export async function getMenu(menuId: string,restaurantId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus && menus.length > 0) {
        let menu:MenuType = menus.find((_menu: { _id: mongoose.Types.ObjectId; }) => _menu._id.toString() == menuId) as MenuType;
        let articles= [];
        let menuArticles:Array<string> = menu.articles as Array<string>;
        console.log(menuArticles.length);
        for (let i = 0; i < menuArticles.length; i++){
            let _article = await getArticle(restaurant.id, menuArticles[i])
            articles.push(_article);
        }
        articles = articles as Array<ArticleType>;
        menu.articles = Array.from(articles);
        console.log(menu.articles);
        return menu;
    }
    return null;
}

export async function getMenus(restaurantId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus:Array<MenuType> = restaurant.menus;
    let menusReturn = [];
    for (const menu of menus) {
        let menuReturn = await getMenu(menu._id,restaurantId);
        if (menuReturn)
            menusReturn.push(menuReturn);
    }
    return menusReturn;
}


export async function deleteMenu(menuId: string,restaurantId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus)
    {
        let findIndex = menus.findIndex((menu: { _id: string; }) => menu._id !== menuId);
        menus.splice(findIndex,1);
    }
    await restaurant.save();
    return menuId;
}

export async function updateMenu(menuId: string,restaurantId: string,payload:any,file?:any) {
    const restaurant = await getRestaurant(restaurantId);
    console.log(restaurantId);
    console.log(restaurant);
    const menus= restaurant.menus;
    if (menus){
        let menu = menus.find((_menu: MenuType)  => _menu._id == menuId);
        let menuIndex = menus.findIndex((_menu: MenuType)  => _menu._id == menuId);
        menu = payload;
        if (menu && payload)
        {
            let linkImage = ""
            if (payload.imageName)
            {
                linkImage = await uploadImage(file,payload.imageName);
                menu.image = linkImage;
            }
            menu._id = new mongoose.Types.ObjectId(menuId);
            menus.splice(menuIndex, 1);
            menus.push(menu);
            console.log(menu);
            console.log(restaurant);
            await restaurant.save();
            return restaurant;
        }

    }
    return false;
}

export async function menuExist(restaurantId: string,menuId: string) {
    const restaurant = await getRestaurant(restaurantId);
    console.log(restaurant);
    const menus= restaurant.menus;
    if (menus){
        return !!menus.find((menu: { _id: string; }) => menu._id == menuId);
    }
    return false;
}

export function isMenuUpdateGoodFormat(payload: UploadMenuPayload) {
    return menuValidator.validate(payload);
}

export function isMenuGoodFormat(payload: AddMenuPayload) {
    return menuValidator.validate(payload);
}
