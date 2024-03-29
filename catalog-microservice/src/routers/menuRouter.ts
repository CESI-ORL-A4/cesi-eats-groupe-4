import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import {
    menuExist,
    createMenu, getMenu, getMenus,
    isMenuGoodFormat, deleteMenu, isMenuUpdateGoodFormat, updateMenu
} from "../controllers/menuController";
import GetMenuPayload from "../types/menu/GetMenuPayload";
import {getRestaurant, restaurantExist, restaurantExistByIdRestaurant} from "../controllers/restaurantController";
import GetMenusPayload from "../types/menu/GetMenusPayload";
import DeleteMenuPayload from "../types/menu/DeleteMenuPayload";
const menuRouter = Router({mergeParams: true});
const multer = require('multer');
const upload = multer();


menuRouter.post("/",upload.single('imageData'),
    async (req: any, res: Response) => {
        const payload = req.body;
        const restaurantId = req.params?.restaurantId;
        if (!payload)
            return res.status(400).json({error:"No Body"});
        payload.articles = JSON.parse(payload.articles)
        const testFormatted = isMenuGoodFormat(payload);
        if (!testFormatted.error)
        {
            if (!await restaurantExistByIdRestaurant(restaurantId))
                return res.status(400).json({error:"restaurant doesn't exist'"});
            const addedMenu = await createMenu(restaurantId,payload,req.file?.buffer);
            return res.status(201).json({status: "Menu registered", menu: addedMenu});
        }
        else{
            return res.status(400).json({error:testFormatted?.error?.message});
        }
});


menuRouter.get("/:menuId",async (req: ReqWithParams<GetMenuPayload>, res: Response) => {
    const payload = req.params;
    const restaurantId = req.params?.restaurantId;
    const menuId = req.params?.menuId;
    if (!menuId || !restaurantId) {
        return res.status(400).json({error: "Restaurant or Menu ID missing"});
    }
    if (!await restaurantExistByIdRestaurant(restaurantId)) {
        return res.status(400).json({error: "Restaurant does not exist"});
    }
    if (await menuExist(restaurantId, menuId)) {
        return res.status(200).json({status: "Menu exist", menu: await getMenu(menuId,restaurantId)});
    } else {
        return res.status(400).json({error: "Menu does not exist"});
    }
});

menuRouter.get("/",
    async (req: ReqWithParams<GetMenusPayload>, res: Response) => {
    const payload = req.params;
    let menus;
    menus = await getMenus(payload.restaurantId);
    return res.status(200).json({ status: "menus",menus});
    });

menuRouter.put("/:menuId",upload.single('imageData'),
    async (req: any, res: Response) => {

        const menuId = req.params.menuId;
        const restaurantId = req.params.restaurantId;
        const payload = req.body;
        if (!payload)
            return res.status(400).json({error:"No Body"});
        payload.articles = JSON.parse(payload.articles)
        if (!menuId || ! restaurantId) {
            return res.status(400).json({ error: "Id is required" });
        }
        if(!await restaurantExistByIdRestaurant(restaurantId))
            return res.status(400).json({ error: "Restaurant does not exist" });
        if (await menuExist(restaurantId,menuId)) {
            const testFormatted = isMenuUpdateGoodFormat(payload);
            if (!testFormatted.error)
            {
                const addedMenu = await updateMenu(menuId,restaurantId,payload,req.file?.buffer);
                return res.status(201).json({status: "Menu registered", menu: addedMenu});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "Menu does not exist" });
    });

menuRouter.delete("/:menuId",
    async (req: ReqWithParams<DeleteMenuPayload>, res: Response) => {
        const payload:DeleteMenuPayload = req.params;
        if (!payload.menuId) {
            return res.status(400).json({ error: "Menu Id is required" });
        }
        if (!await restaurantExistByIdRestaurant(payload.restaurantId)) {
            return res.status(400).json({ error: "Restaurant does not exist" });
        }
        if (await getMenu(payload.menuId,payload.restaurantId)) {
            return res.status(200).json({ status: "Menu delete",menuId:await deleteMenu(payload.menuId,payload.restaurantId)});
        }
        else
            return res.status(400).json({ error: "Menu does not exist" });
    });
export default menuRouter;
