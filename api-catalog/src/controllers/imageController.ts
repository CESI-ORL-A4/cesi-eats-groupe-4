import {uploadImage} from "../image/uploadImage";
export async function createAddImage(imageData: any, imageName: string) {
    return uploadImage(imageData, imageName);
}
