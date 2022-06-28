import mongoose from "mongoose";

type ArticleType = {
    name: string|undefined;
    address: string|undefined;
    _id: string|undefined;
    description: string|undefined;
    image: string|undefined;
}


export default ArticleType;
