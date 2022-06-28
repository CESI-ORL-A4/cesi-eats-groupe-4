import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import {
    getRestaurant,
    restaurantExist,
    deleteRestaurant,
    isRestaurantGoodFormat,
    createRestaurant,
    getRestaurants,
    updateRestaurant,
    isRestaurantUpdateGoodFormat,
    restaurantExistByIdRestaurant,
    getRestaurantByOwnerId
} from "../controllers/restaurantController";
import GetRestaurantPayload from "../types/restaurant/GetRestaurantPayload";
import {ValidationResult} from "joi";
import GetRestaurantByOwnerIdPayload from "../types/restaurant/GetRestaurantByOwnerIdPayload";
import mongoose from "mongoose";
const restaurantRouter = Router({mergeParams: true});
const multer = require('multer');
const upload = multer();


restaurantRouter.post("/",upload.single('imageData'),
    async (req: any, res: Response) => {
        const payload = req.body;
        const testFormatted = isRestaurantGoodFormat(payload);
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


restaurantRouter.get("/:restaurantId",
    async (req: ReqWithParams<GetRestaurantPayload>, res: Response) => {
        const payload = req.params;
        if (!payload.restaurantId) {
            return res.status(400).json({ error: "Id is required" });
        }
        try{
            const objectId = new mongoose.Types.ObjectId(payload.restaurantId);
        }
        catch{
            return res.status(401).json({ error: "Invalid restaurantId" });
        }
        if (await restaurantExistByIdRestaurant(payload.restaurantId)) {
            return res.status(200).json({ status: "Restaurant exist",restaurant:await getRestaurant(payload.restaurantId)});
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
    return res.status(200).json({ status: "Restaurants","restaurants":restaurants});
    });

restaurantRouter.get("/ownerId/:ownerId",
    async (req: ReqWithParams<GetRestaurantByOwnerIdPayload>, res: Response) => {
        let restaurants;
        if (!req.params.ownerId)
            return res.status(400).json({ error: "OwnerId is required" });

        try{
            restaurants = await getRestaurantByOwnerId(req.params.ownerId);
        }
        catch {
            return res.status(400).json({ error: "error" });
        }
        return res.status(200).json({ status: "Restaurants","restaurant":restaurants});
    });

restaurantRouter.put("/:restaurantId",
    async (req: any, res: Response) => {

        const restaurantId = req.params?.restaurantId;
        const payload = req.body;
        if (!restaurantId) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await restaurantExistByIdRestaurant(restaurantId)) {
            const testFormatted : ValidationResult = isRestaurantUpdateGoodFormat(payload);
            if (!testFormatted.error)
            {
                const addedRestaurant = await updateRestaurant(payload,restaurantId);
                return res.status(201).json({status: "Restaurant registered", restaurant: addedRestaurant});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "Restaurant does not exist" });
    });

restaurantRouter.delete("/:restaurantId",
    async (req: ReqWithParams<GetRestaurantPayload>, res: Response) => {
        const restaurantId = req.params?.restaurantId;
        if (!restaurantId) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await getRestaurant(restaurantId)) {
            return res.status(200).json({ status: "Restaurant delete",restaurantId:await deleteRestaurant(restaurantId)});
        }
        else
            return res.status(400).json({ error: "Restaurant does not exist" });
    });
export default restaurantRouter;
