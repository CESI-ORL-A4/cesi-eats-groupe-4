type AddRestaurantPayload = {
    ownerId: string;
    name: string;
    address: string;
    id: string|undefined;
    description: string|undefined;
    imageName: string|undefined;
    imageData: {}|undefined;
}


export default AddRestaurantPayload;
