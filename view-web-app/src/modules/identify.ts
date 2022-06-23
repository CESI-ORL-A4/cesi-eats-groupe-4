import axios from "axios";

export async function addRestaurant(name: string, address: string,email: string,fileData: string,filename:string) {
    try {
        const response = await axios.post('http://localhost:8080/catalog/restaurant/', {
            name,
            address,
            email,
            imageData:fileData,
            imageName:filename,
        })
        if (response.status == 200) {
            console.log(response);
        }
        // Don't forget to return something
        return {"error": response.statusText}
    } catch (err) {
        console.error(err);
    }
}


export async function loginAPI(email: string, password: string) {
    try {
        const response = await axios.post('http://localhost:8090/login', {
            email,
            password
        })
        if (response.status == 200) {
            localStorage.setItem('jwt', JSON.stringify(response?.data?.token));
            localStorage.setItem('role', JSON.stringify(response?.data?.role));
            console.log(response.data)

            return {role: response?.data?.role};
        }
        // Don't forget to return something
        return {"error": response.statusText}
    } catch (err) {
        console.error(err);
    }
}
