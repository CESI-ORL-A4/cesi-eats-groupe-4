import config from "../config.json";
import axios from "axios";
export async function getRestaurantByOwnerId(ownerId: string) {
  try {
    const response = await axios.get(
      `${config.GATEWAY_URL}/catalog/restaurants/ownerId/` + ownerId
    );

    if (response.status < 200 || response.status > 300) {
      return undefined;
    }

    if (response.data.restaurant) {
      return response.data.restaurant;
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
}

export async function getRestaurants() {
  try {
    const response = await axios.get(
      `${config.GATEWAY_URL}/catalog/restaurants/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status < 200 || response.status > 300) {
      console.log(response);
      console.log(response.data.error);
      return null;
    }
    // Don't forget to return something
    return response.data.restaurants;
  } catch (err) {
    console.error(err);
  }
}

export async function addRestaurant(form: FormData) {
  try {
    const response = await axios.post(
      `http://localhost:8080/catalog/restaurants/`,
      form,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status < 200 || response.status > 300) {
      console.log(response);
      console.log(response.data.error);
      return null;
    }
    // Don't forget to return something
    return response.data.restaurant;
  } catch (err) {
    console.error(err);
  }
}

export async function updateRestaurant(form: FormData, restaurantId: string) {
  try {
    const response = await axios.put(
      `${config.GATEWAY_URL}/catalog/restaurants/` + restaurantId,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status < 200 || response.status > 300) {
      console.log(response);
      console.log(response.data.error);
      return null;
    }
    // Don't forget to return something
    return response.data.restaurant;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteRestaurant(form: FormData, restaurantId: string) {
  try {
    const response = await axios.delete(
      `${config.GATEWAY_URL}/catalog/restaurants/` + restaurantId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status < 200 || response.status > 300) {
      console.log(response);
      console.log(response.data.error);
      return null;
    }
    // Don't forget to return something
    return response.data.restaurantId;
  } catch (err) {
    console.error(err);
  }
}
