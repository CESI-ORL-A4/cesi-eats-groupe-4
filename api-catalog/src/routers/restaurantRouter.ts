import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import {
    getRestaurant,
    restaurantExist, deleteRestaurant,
    isRestaurantGoodFormat,
    createRestaurant, getRestaurants, updateRestaurant, isRestaurantUpdateGoodFormat
} from "../controllers/restaurantController";
import GetRestaurantPayload from "../types/restaurant/GetRestaurantPayload";
import AddRestaurantPayload from "../types/restaurant/AddRestaurantPayload";
import {ValidationResult} from "joi";
const restaurantRouter = Router();
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
                return res.status(400).json({error:"restaurant already exists"});
            const addedRestaurant = await createRestaurant(payload,req.file?.buffer);
            return res.status(201).json({status: "Restaurant registered", restaurant: addedRestaurant});
        }
        else{
            return res.status(400).json({error:testFormatted?.error?.message});
        }
});


restaurantRouter.get("/:id",
    async (req: ReqWithParams<GetRestaurantPayload>, res: Response) => {
        const payload = req.params;
        console.log("get ");
        console.log(payload);
        if (!payload.id) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await restaurantExist(payload.id)) {
            return res.status(200).json({ status: "Restaurant exist",restaurant:await getRestaurant(payload.id)});
        }
        return res.status(401).json({ error: "Wrong credentials" });
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

restaurantRouter.put("/:id",
    async (req: any, res: Response) => {

        const id = req.params?.id;
        const payload = req.body;
        console.log("update ");
        console.log(id);
        if (!id) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await getRestaurant(id)) {
            const testFormatted : ValidationResult = isRestaurantUpdateGoodFormat(payload);
            console.log(testFormatted);
            if (!testFormatted.error)
            {
                const addedUser = await updateRestaurant(payload,id);
                return res.status(201).json({status: "Restaurant registered", Restaurant: addedUser});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "Restaurant does not exist" });
    });

restaurantRouter.delete("/",
    async (req: ReqWithBody<GetRestaurantPayload>, res: Response) => {
        const payload = req.body;
        console.log("get ");
        console.log(payload);
        if (!payload.id) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await getRestaurant(payload.id)) {
            return res.status(200).json({ status: "Restaurant delete",user:await deleteRestaurant(payload.id)});
        }
        else
            return res.status(400).json({ error: "Restaurant does not exist" });
    });
export default restaurantRouter;
