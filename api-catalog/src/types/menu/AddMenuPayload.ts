import {Types} from "mongoose";

type AddMenuPayload = {
    _id: Types.ObjectId|undefined;
    name: string;
    price: string|undefined;
    currency: string|undefined;
    description: string|undefined;
    imageName: string|undefined;
    imageData: {}|undefined;
    linkImage: string|undefined;
    articles: Array<string>;
}

export default AddMenuPayload;
