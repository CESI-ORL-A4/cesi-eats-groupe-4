import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import {ValidationResult} from "joi";
import mongoose from "mongoose";
import {
    createNotification,
    deleteNotification,
    getNotification,
    getNotificationByUserId, isNotificationGoodFormat,
    updateReadNotification
} from "../controllers/notificationController";
import GetNotificationPayload from "../types/notification/GetNotificationPayload";
import AddNotificationPayload from "../types/notification/AddNotificationPayload";
const notificationRouter = Router({mergeParams: true});

notificationRouter.get("/:notificationId",
    async (req: ReqWithParams<GetNotificationPayload>, res: Response) => {
        const payload = req.params;
        let notification;
        try{
            notification = await getNotification(payload.notificationId);
        }
        catch (e:any){
            console.log(e.message);
            return res.status(400).json({ error: "error" });
        }
        if (!notification)
            return res.status(404).json({ error: "notification not found" });
        return res.status(200).json({ status: "notification",notification});
    });

notificationRouter.delete("/:notificationId",
    async (req: ReqWithParams<GetNotificationPayload>, res: Response) => {
        const payload = req.params;
        let notification;
        try{
            notification = await deleteNotification(payload.notificationId);
        }
        catch (e:any){
            console.log(e.message);
            return res.status(400).json({ error: "error" });
        }
        return res.status(200).json({ status: "notification", notification});
    });

notificationRouter.post("/:notificationId/makeread",
    async (req: ReqWithParams<GetNotificationPayload>, res: Response) => {
        const payload = req.params;
        let notification;
        try{
            notification = await updateReadNotification(payload.notificationId);
        }
        catch (e:any){
            console.log(e.message);
            return res.status(400).json({ error: "error" });
        }
        return res.status(200).json({ status: "notification", notification});
    });
notificationRouter.post("/",
    async (req: ReqWithParams<AddNotificationPayload>, res: Response) => {
        const payload = req.body;
        let notification;
        const testFormatted = isNotificationGoodFormat(payload);
        if (!testFormatted.error)
        {
            notification = await createNotification(payload);
            return res.status(200).json({ status: "notification", notification});
        }
        else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }

    });
export default notificationRouter;
