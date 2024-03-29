import restaurantValidator from "../validators/restaurant/restaurantValidator";
import restaurantModel from "../model/restaurantModel";
import GetRestaurantPayload from "../types/restaurant/GetRestaurantPayload";
import AddRestaurantPayload from "../types/restaurant/AddRestaurantPayload";
import {uploadImage} from "../image/uploadImage";
import UploadRestaurantPayload from "../types/restaurant/UploadRestaurantPayload";
import {string} from "joi";
import restaurantUpdateValidator from "../validators/restaurant/restaurantUpdateValidator";

export async function restaurantExist(ownerId: string) {
    return await restaurantModel.count({ ownerId}) >0;
}
export async function restaurantExistByIdRestaurant(id: string) {
    return await restaurantModel.count({ _id: id}) >0;
}

export async function getRestaurantByOwnerId(ownerId: string){
    return await restaurantModel.findOne({ ownerId: ownerId}).exec();
}


export async function updateRestaurant(payload: any,id:string){
    if(payload.ownerId)
        ({ ownerId: payload.ownerId, ...payload } = payload);
    if (payload.imageName && payload.imageData){
        const linkImage = await uploadImage(payload.imageData,payload.imageName);
        ({ imageData: payload.imageData,imageName: payload.imageName, ...payload } = payload);
        payload.linkImage = linkImage;
    }
    return await restaurantModel.updateOne({ _id: id }, payload).exec();
}

export async function getRestaurant(id: string) {
    return restaurantModel.findOne({_id: id}).exec();
}

export async function getRestaurants() {
    return restaurantModel.find().exec();
}

export async function createRestaurant(payload: AddRestaurantPayload, file?: any) {
    let linkImage = "";
    if (payload.imageName)
        linkImage = await uploadImage(file, payload.imageName);
    let newRestaurant:UploadRestaurantPayload = {name: payload.name,description:payload.description,address:payload.address,ownerId:payload.ownerId,image: linkImage};
    const restaurant = new restaurantModel(newRestaurant)
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
    await restaurantModel.deleteOne({ _id: id });
    return id;
}
