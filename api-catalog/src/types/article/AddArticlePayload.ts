type AddArticlePayload = {
    restaurantId: string;
    name: string;
    type: string;
    price: string|undefined;
    currency: string|undefined;
    description: string|undefined;
    imageName: string|undefined;
    imageData: {}|undefined;
}

export default AddArticlePayload;
