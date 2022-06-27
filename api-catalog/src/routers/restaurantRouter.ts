import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import {
    getRestaurant,
    restaurantExist, deleteRestaurant,
    isRestaurantGoodFormat,
    createRestaurant, getRestaurants, updateRestaurant, isRestaurantUpdateGoodFormat, restaurantExistByIdRestaurant
} from "../controllers/restaurantController";
import GetRestaurantPayload from "../types/restaurant/GetRestaurantPayload";
import {ValidationResult} from "joi";
const restaurantRouter = Router({mergeParams: true});
const multer = require('multer');
const upload = multer();


restaurantRouter.post("/",upload.single('imageData'),
    async (req: any, res: Response) => {
        const payload = req.body;
        console.log(req);
        const testFormatted = isRestaurantGoodFormat(payload);
        console.log(testFormatted);
        if (!testFormatted.error)
        {
            if (await restaurantExist(payload.ownerId))
                return res.status(400).json({error:"Owner have restaurant"});
            const addedRestaurant = await createRestaurant(payload,req.file?.buffer);
            return res.status(200).json({status: "Restaurant registered", restaurant: addedRestaurant});
        }
        else{
            return res.status(400).json({error:testFormatted?.error?.message});
        }
});


restaurantRouter.get("/:idRestaurant",
    async (req: ReqWithParams<GetRestaurantPayload>, res: Response) => {
        const payload = req.params;
        console.log("get ");
        console.log(payload);
        if (!payload.idRestaurant) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await restaurantExistByIdRestaurant(payload.idRestaurant)) {
            return res.status(200).json({ status: "Restaurant exist",restaurant:await getRestaurant(payload.idRestaurant)});
        }
        return res.status(401).json({ error: "Error" });
});

restaurantRouter.get("/",
    async (req: ReqWithParams<GetRestaurantPayload>, res: Response) => {
    let restaurants;
    try{
        restaurants = await getRestaurants()
    }
    catch {
        return res.status(400).json({ error: "error" });
    }
    return res.status(200).json({ status: "Restaurants",restaurants});
    });

restaurantRouter.put("/:idRestaurant",
    async (req: any, res: Response) => {

        const idRestaurant = req.params?.idRestaurant;
        const payload = req.body;
        console.log("update ");
        console.log(idRestaurant);
        if (!idRestaurant) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await restaurantExistByIdRestaurant(idRestaurant)) {
            const testFormatted : ValidationResult = isRestaurantUpdateGoodFormat(payload);
            console.log(testFormatted);
            if (!testFormatted.error)
            {
                const addedUser = await updateRestaurant(payload,idRestaurant);
                return res.status(201).json({status: "Restaurant registered", Restaurant: addedUser});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "Restaurant does not exist" });
    });

restaurantRouter.delete("/:idRestaurant",
    async (req: ReqWithParams<GetRestaurantPayload>, res: Response) => {
        const idRestaurant = req.params?.idRestaurant;
        console.log("get ");
        console.log(idRestaurant);
        if (!idRestaurant) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await getRestaurant(idRestaurant)) {
            return res.status(200).json({ status: "Restaurant delete",user:await deleteRestaurant(idRestaurant)});
        }
        else
            return res.status(400).json({ error: "Restaurant does not exist" });
    });
export default restaurantRouter;
