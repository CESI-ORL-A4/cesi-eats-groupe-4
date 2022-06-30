import { Request, Response, Router } from "express";
import { getAllDeliveriesForDeliverer, getDeliveredDeliveriesForDeliverer, getInProcessDeliveriesForDeliverer, getUnderShipmentDeliveriesForDeliverer } from "../controllers/deliveriesController";

const deliverersRouter = Router({ mergeParams: true });

type IDParam = {
    id: string
}

deliverersRouter.get("/:id/deliveries",
    async (req: Request<IDParam>, res: Response) => {
        const id = parseInt(req.params.id);
        return res.status(200).json(await getAllDeliveriesForDeliverer(id));
});

deliverersRouter.get("/:id/deliveries/in-process",
    async (req: Request<IDParam>, res: Response) => {
        const id = parseInt(req.params.id);
        return res.status(200).json(await getInProcessDeliveriesForDeliverer(id));
});

deliverersRouter.get("/:id/deliveries/under-shipment",
    async (req: Request<IDParam>, res: Response) => {
        const id = parseInt(req.params.id);
        return res.status(200).json(await getUnderShipmentDeliveriesForDeliverer(id));
});

deliverersRouter.get("/:id/deliveries/delivered",
    async (req: Request<IDParam>, res: Response) => {
        const id = parseInt(req.params.id);
        return res.status(200).json(await getDeliveredDeliveriesForDeliverer(id));
});

export default deliverersRouter;
