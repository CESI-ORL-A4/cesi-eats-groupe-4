import { Request, Response, Router } from "express";
import { getAllOrdersByUsersId } from "../controllers/ordersController";
import validateMongoIdParam from "../middlewares/validateMongoIdParam";

const usersRouter = Router();

usersRouter.get("/:id/orders",
    async (req: Request<{ id: string}>, res: Response) => {
        return res.status(200).json(await getAllOrdersByUsersId(req.params.id));
})

export default usersRouter;
