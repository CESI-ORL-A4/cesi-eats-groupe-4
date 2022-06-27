import * as mongoose from "mongoose";

type UpdateMenuPayload = {
    _id: mongoose.Types.ObjectId|undefined;
    name: string|undefined;
    idRestaurant: string|undefined;
    description: string|undefined;
    imageName: string|undefined;
    imageData: {}|undefined;
    image: string|undefined;
    articles: Array<any>|undefined;
    currency: string|undefined;
}


export default UpdateMenuPayload;
