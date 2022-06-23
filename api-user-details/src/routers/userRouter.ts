import { Router, Response } from "express";
import {createUser, userExists, isUserGoodFormat, getUser, updateUser, deleteUser} from "../controllers/userController";
import { ReqWithBody } from "../types/expressTypes";
import GetUserPayload from "../types/user/GetUserPayload";
import AddUserPayload from "../types/user/AddUserPayload";
import emailValidator from "../validator/emailValidator";
import Joi, {ValidationResult} from "joi";
const userRouter = Router();

userRouter.post("/create",
    async (req: ReqWithBody<AddUserPayload>, res: Response) => {
        const payload = req.body;
        console.log("create ");
        console.log(payload);
        if (emailValidator.validate(payload.email).error) {
            return res.status(400).json({ error: "email is required" });
        }
        if (!await userExists(payload.email)) {
            const testFormatted = isUserGoodFormat(payload);
            console.log(testFormatted);
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

userRouter.post("/get",
    async (req: ReqWithBody<GetUserPayload>, res: Response) => {
        const payload = req.body;
        console.log("get ");
        console.log(payload);
        if (emailValidator.validate(payload.email).error) {
            return res.status(400).json({ error: "email is required" });
        }
        if (await userExists(payload.email)) {
            return res.status(200).json({ status: "User exists",user:await getUser(payload.email)});
        }
        return res.status(401).json({ error: "Wrong credentials" });
});

userRouter.post("/update",
    async (req: ReqWithBody<AddUserPayload>, res: Response) => {
        const payload = req.body;
        console.log("update ");
        console.log(payload);
        if (emailValidator.validate(payload.email).error) {
            return res.status(400).json({ error: "email is required" });
        }
        if (await userExists(payload.email)) {
            const testFormatted : ValidationResult = isUserGoodFormat(payload);
            console.log(testFormatted);
            if (!testFormatted.error)
            {
                const addedUser = await updateUser(payload);
                return res.status(201).json({status: "User registered", user: addedUser});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "User does not exist" });
    });

userRouter.delete("/delete",
    async (req: ReqWithBody<GetUserPayload>, res: Response) => {
        const payload = req.body;
        console.log("get ");
        console.log(payload);
        if (emailValidator.validate(payload.email).error) {
            return res.status(400).json({ error: "email is required" });
        }
        if (await userExists(payload.email)) {
            return res.status(200).json({ status: "User delete",user:await deleteUser(payload.email)});
        }
        else
            return res.status(400).json({ error: "user does not exist" });
    });

export default userRouter;
