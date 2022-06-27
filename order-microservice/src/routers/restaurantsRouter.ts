import { Request, Response, Router } from "express";
import { getAllOrdersByRestaurantId } from "../controllers/ordersController";
import validateMongoIdParam from "../middlewares/validateMongoIdParam";

const restaurantsRouter = Router();

restaurantsRouter.get("/:id/orders",
    validateMongoIdParam(),
    async (req: Request<{ id: string}>, res: Response) => {
        return res.status(200).json(await getAllOrdersByRestaurantId(req.params.id));
})

export default restaurantsRouter;

