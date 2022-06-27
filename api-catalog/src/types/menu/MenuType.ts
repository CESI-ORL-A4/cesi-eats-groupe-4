import ArticleType from "../article/ArticleType";

type MenuType = {
    _id:string;
    name: string|undefined;
    idRestaurant: string|undefined;
    description: string|undefined;
    imageName: string|undefined;
    imageData: {}|undefined;
    image: string|undefined;
    articles: Array<string> | Array<ArticleType> | undefined;
    currency: string|undefined;
    id:string|undefined;
}


export default MenuType;
