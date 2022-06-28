import ArticleType from "../article/ArticleType";
import MenuType from "../menu/MenuType";

type RestaurantType = {
    ownerId: string;
    name: string;
    address: string;
    _id: string|undefined;
    description: string|undefined;
    image: string|undefined;
    articles: Array<ArticleType> | undefined;
    menus: Array<MenuType>|undefined;
}


export default RestaurantType;
