import { Request, Response, Router } from "express";
import { createDelivery, deleteDeliveryById, deliveryExists, getAllDeliveries, getDeliveryById, updateDelivery } from "../controllers/deliveriesController";
import validateDeliveryAttributesData from "../middlewares/validateDeliveryAttributesData";
import validateInputData from "../middlewares/validateInputData";
import validateMongoIdParam from "../middlewares/validateMongoIdParam";
import { ReqWithBody } from "../types/expressTypes";
import { mongoIDFromString } from "../types/mongoose";
import DeliveryAttributesPayload from "../types/payloads/DeliveryAttributesPayload";
import DeliveryState from "../model/DeliveryState";

const deliveriesRouter = Router({ mergeParams: true });

type IDParam = {
    id: string
}

deliveriesRouter.post("/",
    validateDeliveryAttributesData(),
    validateInputData(),
    async (req: ReqWithBody<DeliveryAttributesPayload>, res: Response) => {
    return res.status(201).json(await createDelivery(req.body));
});

deliveriesRouter.delete("/:id",
    validateMongoIdParam(),
    async (req: Request<IDParam>, res: Response) => {
        const id = mongoIDFromString(req.params.id);
        const deleted = await deleteDeliveryById(id);
        if (deleted) {
            return res.status(200).json(deleted);
        }
        return res.status(404).json({ error: `Delivery with id ${req.params.id} doesn't exist` });
});

deliveriesRouter.post("/:id/delivered",
    validateMongoIdParam(),
    async (req: Request<IDParam>, res: Response) => {
        const id = mongoIDFromString(req.params.id);
        const exists = await deliveryExists(id);
        if (exists) {
            const updated = await updateDelivery(id, { state: DeliveryState.DELIVERED });
            return res.status(200).json(updated);
        }
        return res.status(404).json({ error: `Delivery with id = ${req.params.id} doesn't exist` });
});

deliveriesRouter.get("/", async (_: Request, res: Response) => {
    return res.status(200).json(await getAllDeliveries());
})

deliveriesRouter.get("/:id",
    validateMongoIdParam(),
    async (req: Request<IDParam>, res: Response) => {
        const id = mongoIDFromString(req.params.id);
        const order = await getDeliveryById(id);
        if (order) {
            return res.status(200).json(order);
        }
        return res.status(404).json({ error: `Delivery with id = ${req.params.id} doesn't exist` });
})

export default deliveriesRouter;
