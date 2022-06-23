import { Router, Response } from "express";
import {ReqWithBody} from "../types/expressTypes";
import {
    getRestaurant,
    restaurantExist,deleteRestaurant,
    isRestaurantGoodFormat,
    createRestaurant
} from "../controllers/restaurantController";
import GetRestaurantPayload from "../types/restaurant/GetRestaurantPayload";
import AddRestaurantPayload from "../types/restaurant/AddRestaurantPayload";
const restaurantRouter = Router();

restaurantRouter.post("/create",
    async (req: ReqWithBody<AddRestaurantPayload>, res: Response) => {
        const payload = req.body;
        console.log("create ");
        console.log(payload);
        const testFormatted = isRestaurantGoodFormat(payload);
        console.log(testFormatted);
        if (!testFormatted.error)
        {
            const addedRestaurant = await createRestaurant(payload);
            return res.status(201).json({status: "Restaurant registered", user: addedRestaurant});
        }
        else{
            return res.status(400).json({error:testFormatted?.error?.message});
        }
});


restaurantRouter.post("/get",
    async (req: ReqWithBody<GetRestaurantPayload>, res: Response) => {
        const payload = req.body;
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

/*restaurantRouter.post("/update",
    async (req: ReqWithBody<AddRestaurantPayload>, res: Response) => {
        const payload = req.body;
        console.log("update ");
        console.log(payload);
        if (!payload.id) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await restaurantExist(payload.id)) {
            const testFormatted : ValidationResult = isRestaurantGoodFormat(payload);
            console.log(testFormatted);
            if (!testFormatted.error)
            {
                const addedUser = await updateRestaurant(payload);
                return res.status(201).json({status: "Restaurant registered", Restaurant: addedUser});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "Restaurant does not exist" });
    });*/

restaurantRouter.delete("/delete",
    async (req: ReqWithBody<GetRestaurantPayload>, res: Response) => {
        const payload = req.body;
        console.log("get ");
        console.log(payload);
        if (!payload.id) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await restaurantExist(payload.id)) {
            return res.status(200).json({ status: "Restaurant delete",user:await deleteRestaurant(payload.id)});
        }
        else
            return res.status(400).json({ error: "Restaurant does not exist" });
    });
export default restaurantRouter;
