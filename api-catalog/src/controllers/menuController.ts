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

export async function getMenu(menuId: string,restaurantId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus){
        let menu = menus.find((menu: { _id: string; }) => menu._id == menuId);
        let articles = [];
        for(let articleId in menus.article) {
            let article = await getArticle(restaurant.id, articleId)
            articles.push(article);
        }
        menu.articles = articles;
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


export async function deleteMenu(restaurantId: string,menuId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus)
        menus.filter((menu: { _id: string; }) => menu._id !== menuId);
    await restaurant.save();
    return restaurant;
}

export async function updateMenu(menuId: string,restaurantId: string,payload:UpdateMenuPayload,file?:any) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus){
        let menu = menus.find((_menu: { _id: string; })  => _menu._id == menuId);
        let linkImage = ""
        if (payload.imageName)
            linkImage = uploadImage(file,payload.imageName);
        menu = payload;
        menu.image = linkImage;
        await restaurant.save();
        return menu;
    }
    return false;
}
/*


*/
export async function createMenu(idRestaurant:string,payload: AddMenuPayload, file?: any) {
    let linkImage = ""
    if (payload.imageName)
        linkImage = uploadImage(file,payload.imageName);
    let menu = await menuModel(payload);
    menu.linkImage = linkImage;
    const restaurant = await getRestaurant(idRestaurant);
    restaurant.menus.push(menu);
    await restaurant.save();
    return menu;
}

export async function menuExist(restaurantId: string,menuId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus){
        return !!menus.find((menu: { _id: string; }) => menu._id == menuId);
    }
    return false;
}

export function isMenuUpdateGoodFormat(payload: UploadMenuPayload) {
    return menuUpdateValidator.validate(payload);
}

export function isMenuGoodFormat(payload: AddMenuPayload) {
    return menuValidator.validate(payload);
}
