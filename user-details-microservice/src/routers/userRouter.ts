import { Router, Response, Request } from "express";
import {createUser, userExistsByMail, isUserGoodFormat, updateUser, deleteUser, getUserById, userExistsById, getAllUsers} from "../controllers/userController";
import { ReqWithBody } from "../types/expressTypes";
import RegisterUserPayload from "../types/user/RegisterUserPayload";
import emailValidator from "../validator/emailValidator";
import {ValidationResult} from "joi";
import {getSponsorship} from "../controllers/sponsorshipController";
const userRouter = Router();

userRouter.post("/register",
    async (req: ReqWithBody<RegisterUserPayload>, res: Response) => {
        const payload = req.body;
        if (emailValidator.validate(payload.email).error) {
            return res.status(400).json({ error: "email is required" });
        }
        if (!await userExistsByMail(payload.email)) {
            const testFormatted = isUserGoodFormat(payload);
            if (!testFormatted.error)
            {
                const addedUser = await createUser(payload);
                return res.status(201).json({status: "User registered", user: addedUser});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }

        }
        return res.status(409).json({ error: "User already exists" });
});

userRouter.get("/",
    async (_: Request, res: Response) => {
        const users = await getAllUsers();
        return res.status(200).json({ users });
});

userRouter.get("/:id",
    async (req: Request<{ id: number }>, res: Response) => {
        const userId = req.params.id;
        if (await userExistsById(userId)) {
            const user = await getUserById(userId);
            return res.status(200).json({ ...user?.toJSON() });
        }
        return res.status(404).json({ error: "User doesn't exist" });
});

userRouter.put("/",
    async (req: ReqWithBody<RegisterUserPayload>, res: Response) => {
        const payload = req.body;
        if (emailValidator.validate(payload.email).error) {
            return res.status(400).json({ error: "email is required" });
        }
        if (await userExistsByMail(payload.email)) {
            const testFormatted : ValidationResult = isUserGoodFormat(payload);
            if (!testFormatted.error)
            {
                const [updatedUser, created] = await updateUser(payload);
                if (created) {
                    return res.status(201).json({ status: "User registered", user: updatedUser });
                }
                return res.status(200).json({ status: "User updated", user: updatedUser })
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "User does not exist" });
    });

userRouter.delete("/",
    async (req: Request<{ id: number }>, res: Response) => {
        const userId = req.params.id;
        if (await userExistsById(userId)) {
            const deletedUser = await deleteUser(userId);
            return res.status(200).json({ status: "User deleted", deletedUser });
        }
        else {
            return res.status(404).json({ error: "user does not exist" });
        }
    });

userRouter.post("/sponsorship/:id",
    async (req: Request<{ id: number }>, res: Response) => {
        const userId = req.params.id;
        if (await userExistsById(userId)) {
            return res.status(204).send();
        }
        else {
            return res.status(404).json({ error: "user does not exist" });
        }
    });

userRouter.get("/sponsorship/:id",
    async (req: Request<{ id: number }>, res: Response) => {
        const userId = req.params.id;
        if (await userExistsById(userId)) {
            const sponsorshipUser = await getSponsorship(userId);

            return res.status(200).json({ ...sponsorshipUser?.toJSON() });
        }
        else {
            return res.status(404).json({ error: "User does not exist" });
        }
    });

export default userRouter;
