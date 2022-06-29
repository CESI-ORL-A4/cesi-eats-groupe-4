import { Request, Response, Router } from "express";
import { createOrder, deleteOrderById, getAllOrders, getOrderById, orderExists, updateOrder } from "../controllers/ordersController";
import validateInputData from "../middlewares/validateInputData";
import validateMongoIdParam from "../middlewares/validateMongoIdParam";
import validateOrderAttributesData from "../middlewares/validateOrderAttributesData";
import { ReqWithBody, ReqWithBodyAndParams } from "../types/expressTypes";
import OrderAttributesPayload from "../types/payloads/OrderAttributesPayload";

const ordersRouter = Router({ mergeParams: true });

type IDParam = {
    id: string
}

ordersRouter.post("/",
    validateOrderAttributesData(),
    validateInputData(),
    async (req: ReqWithBody<OrderAttributesPayload>, res: Response) => {
    return res.status(201).json(await createOrder(req.body));
});

ordersRouter.delete("/:id",
    validateMongoIdParam(),
    async (req: Request<IDParam>, res: Response) => {
        const deleted = await deleteOrderById(req.params.id);
        if (deleted) {
            return res.status(200).json(deleted);
        }
        return res.status(404).json({ error: `Order with id ${req.params.id} doesn't exist` });
});

ordersRouter.put("/:id",
    validateMongoIdParam(),
    validateInputData(),
    async (req: ReqWithBodyAndParams<IDParam, any>, res: Response) => {
        const exists = await orderExists(req.params.id);
        if (exists) {
            const updated = await updateOrder(req.params.id, req.body);
            return res.status(200).json(updated);
        }
        return res.status(404).json({ error: `Order with id = ${req.params.id} doesn't exist` });
});

ordersRouter.get("/", async (_: Request, res: Response) => {
    return res.status(200).json(await getAllOrders());
})

ordersRouter.get("/:id",
    validateMongoIdParam(),
    async (req: Request<IDParam>, res: Response) => {
        const order = await getOrderById(req.params.id);
        if (order) {
            return res.status(200).json(order);
        }
        return res.status(404).json({ error: `Order with id = ${req.params.id} doesn't exist` });
})

export default ordersRouter;
