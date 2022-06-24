import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import {
    menuExist,
    createMenu, getMenu, getMenus,
    isMenuGoodFormat, deleteMenu, isMenuUpdateGoodFormat, updateMenu
} from "../controllers/menuController";
import GetMenuPayload from "../types/menu/GetMenuPayload";
import {getRestaurant, restaurantExistByIdRestaurant} from "../controllers/restaurantController";
import GetMenusPayload from "../types/menu/GetMenusPayload";
import DeleteMenuPayload from "../types/menu/DeleteMenuPayload";
const menuRouter = Router();
const multer = require('multer');
const upload = multer();


menuRouter.post("/",upload.single('imageData'),
    async (req: any, res: Response) => {
        const payload = req.body;
        const restaurantId = req.params?.idRestaurant;
        console.log("Create menu");
        const testFormatted = isMenuGoodFormat(payload);
        console.log(testFormatted);
        if (!testFormatted.error)
        {
            if (!await getRestaurant(restaurantId))
                return res.status(400).json({error:"restaurant doesn't exist'"});
            const addedMenu = await createMenu(payload,req.file?.buffer);
            return res.status(201).json({status: "Menu registered", menu: addedMenu});
        }
        else{
            return res.status(400).json({error:testFormatted?.error?.message});
        }
});


menuRouter.get("/:menuId",(req: ReqWithParams<GetMenuPayload>, res: Response) => {
    const payload = req.params;
    const restaurantId = req.params?.restaurantId;
    const menuId = req.params?.menuId;
    console.log("get menu ");
    console.log(payload);
    if (!menuId || !restaurantId) {
        return res.status(400).json({ error: "Restaurant or Menu ID missing" });
    }
    if (!await restaurantExistByIdRestaurant(restaurantId)) {
        return res.status(400).json({ error: "Restaurant does not exist" });
    }
    if (await menuExist(restaurantId,menuId)) {
        return res.status(200).json({ status: "Menu exist",menu:await getMenu(restaurantId,menuId)});
    }
    else{
        return res.status(400).json({ error: "Menu does not exist" });
    }});

menuRouter.get("/",
    async (req: ReqWithParams<GetMenusPayload>, res: Response) => {
    const payload = req.params;
    let menus;
    try{
        menus = await getMenus(payload.restaurantId);
    }
    catch {
        return res.status(400).json({ error: "error" });
    }
    return res.status(200).json({ status: "Menus",menus});
    });

menuRouter.put("/:idMenu",upload.single('imageData'),
    async (req: any, res: Response) => {

        const menuId = req.params?.menuId;
        const restaurantId = req.params?.restaurantId;
        const payload = req.body;
        console.log("update ");
        console.log(menuId);
        if (!menuId || ! restaurantId) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await menuExist(restaurantId,menuId)) {
            const testFormatted = isMenuUpdateGoodFormat(payload);
            if (!testFormatted.error)
            {
                const addedUser = await updateMenu(restaurantId,menuId,req.file?.buffer);
                return res.status(201).json({status: "Menu registered", Menu: addedUser});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "Menu does not exist" });
    });

menuRouter.delete("/:menuId",
    async (req: ReqWithBody<DeleteMenuPayload>, res: Response) => {
        const payload = req.body;
        const menuId = req.params?.menuId;
        const restaurantId = req.params?.restaurantId;
        console.log("get ");
        console.log(payload);
        if (menuId) {
            return res.status(400).json({ error: "Menu Id is required" });
        }
        if (!await restaurantExistByIdRestaurant(restaurantId)) {
            return res.status(400).json({ error: "Restaurant does not exist" });
        }/*
        if (!await isMenuDeletable(payload.restaurantId,payload.menuId)) {
            return res.status(400).json({ error: "Restaurant does not exist" });
        }*/
        if (await getMenu(restaurantId,menuId)) {
            return res.status(200).json({ status: "Menu delete",user:await deleteMenu(restaurantId,menuId)});
        }
        else
            return res.status(400).json({ error: "Menu does not exist" });
    });
export default menuRouter;
