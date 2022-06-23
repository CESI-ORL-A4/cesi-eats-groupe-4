import restaurantValidator from "../validators/restaurantValidator";
import restaurantModel from "../model/restaurantModel";
import GetRestaurantPayload from "../types/restaurant/GetRestaurantPayload";
import AddRestaurantPayload from "../types/restaurant/AddRestaurantPayload";
import {uploadImage} from "../image/uploadImage";
import UploadRestaurantPayload from "../types/restaurant/UploadRestaurantPayload";

export async function restaurantExist(email: string) {
    return !!restaurantModel.count({email: email}).exec();
}

/*export async function updateRestaurant(payload: AddRestaurantPayload) {
    let restaurant = await getRestaurant(payload.id);
    return await restaurant.update(payload).exec();
}*/

export async function getRestaurant(id: string) {
    return restaurantModel.findOne({_id: id}).exec();
}

export async function createRestaurant(payload: AddRestaurantPayload) {
    let linkImage = ""
    if (payload.imageName && payload.imageData)
        linkImage = uploadImage(payload.imageData,payload.imageName);
    let newImage:UploadRestaurantPayload = {name: payload.name,description:payload.description,address:payload.address,email:payload.email,imageLink: linkImage};
    const restaurant = new restaurantModel(newImage)
    await restaurant.save();
}

export function isRestaurantGoodFormat(payload: AddRestaurantPayload) {
    return restaurantValidator.validate(payload);
}

export async function deleteRestaurant(id: string) {
    await restaurantModel.deleteOne({ _id: id });
}
