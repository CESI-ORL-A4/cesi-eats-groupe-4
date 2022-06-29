import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import GetNotificationByUserIdPayload from "../types/notification/GetNotificationByUserPayload";
import {
    deleteNotificationsByUserId,
    getNotificationByUserId,
    makeUserNotificationRead
} from "../controllers/notificationController";
const userNotificationRouter = Router({mergeParams: true});

userNotificationRouter.get("/",
    async (req: ReqWithParams<GetNotificationByUserIdPayload>, res: Response) => {
        const payload = req.params;
        let notifications;
        try{
            notifications = await getNotificationByUserId(payload.userId);
        }
        catch (e:any){
            console.log(e.message);
            return res.status(400).json({ error: "error" });
        }
        return res.status(200).json({ status: "Notifications",notifications});
    });

userNotificationRouter.post("/makeread",
    async (req: ReqWithParams<GetNotificationByUserIdPayload>, res: Response) => {
        const payload = req.params;
        let notifications;
        try{
            notifications = await makeUserNotificationRead(payload.userId);
        }
        catch (e:any){
            return res.status(400).json({ error: "error" });
        }
        return res.status(200).json({ status: "Notifications",notifications});
    });

userNotificationRouter.delete("/",
    async (req: ReqWithParams<GetNotificationByUserIdPayload>, res: Response) => {
        const payload = req.params;
        let userId;
        try{
            userId = await deleteNotificationsByUserId(payload.userId);
        }
        catch (e:any){
            return res.status(400).json({ error: "error" });
        }
        return res.status(200).json({ status: "Notifications deleted",userId});
    });
export default userNotificationRouter;
