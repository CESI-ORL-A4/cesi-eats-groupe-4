import restaurantValidator from "../validators/restaurantValidator";
import restaurantModel from "../model/restaurantModel";
import GetRestaurantPayload from "../types/restaurant/GetRestaurantPayload";
import AddRestaurantPayload from "../types/restaurant/AddRestaurantPayload";
import {uploadImage} from "../image/uploadImage";
import UploadRestaurantPayload from "../types/restaurant/UploadRestaurantPayload";
import {string} from "joi";
import restaurantUpdateValidator from "../validators/restaurantUpdateValidator";

export async function restaurantExist(email: string) {
    return await restaurantModel.count({ email}) >0;
}

export async function updateRestaurant(payload: any,id:string){
    if(payload.email)
        ({ email: payload.email, ...payload } = payload);
    if (payload.imageName && payload.imageData){
        const linkImage = uploadImage(payload.imageData,payload.imageName);
        ({ imageData: payload.imageData,imageName: payload.imageName, ...payload } = payload);
        payload.linkImage = linkImage;
    }
    return await restaurantModel.updateOne({ _id: id }, payload);
}

export async function getRestaurant(id: string) {
    return restaurantModel.findOne({_id: id}).exec();
}

export async function getRestaurants() {
    return restaurantModel.find().exec();
}

export async function createRestaurant(payload: AddRestaurantPayload) {
    let linkImage = ""
    if (payload.imageName && payload.imageData)
        linkImage = uploadImage(payload.imageData,payload.imageName);
    let newImage:UploadRestaurantPayload = {name: payload.name,description:payload.description,address:payload.address,email:payload.email,imageLink: linkImage};
    const restaurant = new restaurantModel(newImage)
    await restaurant.save();
    return restaurant;
}

export function isRestaurantGoodFormat(payload: AddRestaurantPayload) {
    return restaurantValidator.validate(payload);
}

export function isRestaurantUpdateGoodFormat(payload: UploadRestaurantPayload) {
    return restaurantUpdateValidator.validate(payload);
}

export async function deleteRestaurant(id: string) {
    return await restaurantModel.deleteOne({ _id: id });
}
