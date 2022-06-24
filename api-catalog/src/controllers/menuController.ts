import menuValidator from "../validators/menu/menuValidator";
import AddMenuPayload from "../types/menu/AddMenuPayload";
import {uploadImage} from "../image/uploadImage";
import UploadMenuPayload from "../types/menu/UploadMenuPayload";
import {getMenu} from "./menuController";
import UpdateMenuPayload from "../types/menu/UpdateMenuPayload";
import {getRestaurant} from "./restaurantController";

export async function getMenu(menuId: string,restaurantId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus){
        return menus.find(menu => menu.id == menuId);
    }
    return null;
}

export async function getMenus(restaurantId: string) {
    const restaurant = await getRestaurant(restaurantId);
    //TODO replace articleId by id
    return restaurant.menus;
}


export async function deleteMenu(restaurantId: string,menuId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus)
        menus.filter(menu => menu.id !== menuId);
    await menu.save();
    return menu;
}
/*
export async function isMenuDeletable() {
    const result = false;
    //TODO faire quand menu seront fait
}

export async function updateMenu(menuId: string,menuId: string,payload:UpdateMenuPayload,file?:any) {
    const menu = await getMenu(menuId);
    const menus= menu.menus;
    if (menus){
        let menu = menus.find(_menu => _menu.id == menuId);
        let linkImage = ""
        if (payload.imageName)
            linkImage = uploadImage(file,payload.imageName);
        menu = payload;
        menu.image = linkImage;
        await menu.save();
        return menu;
    }
    return false;
}

export async function createMenu(payload: AddMenuPayload, file?: any) {
    let linkImage = ""
    if (payload.imageName)
        linkImage = uploadImage(file,payload.imageName);
    let menu = await getMenu(payload.menuId);
    let menu:any;
    menu.linkImage = linkImage;
    menu.menus.push(menu);
    await menu.save();
    return menu;
}*/

export async function menuExist(restaurantId: string,menuId: string) {
    const restaurant = await getRestaurant(restaurantId);
    const menus= restaurant.menus;
    if (menus){
        return !!menus.find(menu => menu.id == menuId);
    }
    return false;
}

export function isMenuUpdateGoodFormat(payload: UploadMenuPayload) {
    return menuUpdateValidator.validate(payload);
}

export function isMenuGoodFormat(payload: AddMenuPayload) {
    return menuValidator.validate(payload);
}
