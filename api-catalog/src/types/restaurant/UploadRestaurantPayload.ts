type UploadRestaurantPayload = {
    ownerId: string;
    name: string;
    address: string;
    description: string|undefined;
    imageLink: string|undefined;
}


export default UploadRestaurantPayload;
