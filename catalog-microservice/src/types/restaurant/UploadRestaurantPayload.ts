type UploadRestaurantPayload = {
    ownerId: string;
    name: string;
    address: string;
    description: string|undefined;
    image: string|undefined;
}


export default UploadRestaurantPayload;
