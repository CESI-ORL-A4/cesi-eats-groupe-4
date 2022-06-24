import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import {
    articleExist,
    createArticle, getArticle, getArticles,
    isArticleGoodFormat, deleteArticle, isArticleUpdateGoodFormat, updateArticle
} from "../controllers/articleController";
import GetArticlePayload from "../types/article/GetArticlePayload";
import {getRestaurant, restaurantExistByIdRestaurant} from "../controllers/restaurantController";
import GetArticlesPayload from "../types/article/GetArticlesPayload";
import DeleteArticlePayload from "../types/article/DeleteArticlePayload";
const articleRouter = Router();
const multer = require('multer');
const upload = multer();


articleRouter.post("/",upload.single('imageData'),
    async (req: any, res: Response) => {
        const payload = req.body;
        const restaurantId = req.params.idRestaurant;
        console.log("Create article");
        const testFormatted = isArticleGoodFormat(payload);
        console.log(testFormatted);
        if (!testFormatted.error)
        {
            if (!restaurantId)
                return res.status(400).json({error:"Restaurant id not found"});
            if (!await getRestaurant(restaurantId))
                return res.status(400).json({error:"restaurant doesn't exist'"});
            if (!payload.currency)
                payload.currency = "€";
            const addedArticle = await createArticle(payload,restaurantId,req.file?.buffer);
            return res.status(201).json({status: "Article registered", article: addedArticle});
        }
        else{
            return res.status(400).json({error:testFormatted?.error?.message});
        }
});


articleRouter.get("/:articleId",(req: ReqWithParams<GetArticlePayload>, res: Response) => {
    const payload = req.params;
    console.log("get article ");
    console.log(payload);
    if (!payload.articleId || !payload.restaurantId) {
        return res.status(400).json({ error: "Restaurant or Article ID missing" });
    }
    if (!await restaurantExistByIdRestaurant(payload.restaurantId)) {
        return res.status(400).json({ error: "Restaurant does not exist" });
    }
    if (await articleExist(payload.restaurantId,payload.articleId)) {
        return res.status(200).json({ status: "Article exist",article:await getArticle(payload.restaurantId,payload.articleId)});
    }
    else{
        return res.status(400).json({ error: "Article does not exist" });
    }});

articleRouter.get("/",
    async (req: ReqWithParams<GetArticlesPayload>, res: Response) => {
    const payload = req.params;
    let articles;
    try{
        articles = await getArticles(payload.restaurantId);
    }
    catch {
        return res.status(400).json({ error: "error" });
    }
    return res.status(200).json({ status: "Articles",articles});
    });

articleRouter.put("/:articleId",upload.single('imageData'),
    async (req: any, res: Response) => {
        const payload = req.body;
        const restaurantId = req.params?.restaurantId;
        const articleId = req.params?.articleId;
        console.log("update ");
        console.log(articleId);
        if (!articleId || !restaurantId) {
            return res.status(400).json({ error: "Id is required" });
        }
        if (await articleExist(restaurantId,articleId)) {
            const testFormatted = isArticleUpdateGoodFormat(payload);
            console.log(testFormatted);
            if (!testFormatted.error)
            {
                if (!payload.currency)
                    payload.currency = "€";
                const addedUser = await updateArticle(restaurantId,articleId,req.file?.buffer);
                return res.status(201).json({status: "Article registered", Article: addedUser});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "Article does not exist" });
    });

articleRouter.delete("/:articleId",
    async (req: ReqWithBody<DeleteArticlePayload>, res: Response) => {
        const payload = req.params;
        console.log("get ");
        console.log(payload);
        if (!payload.articleId || !payload.restaurantId) {
            return res.status(400).json({ error: "Article Id is required" });
        }
        if (!await restaurantExistByIdRestaurant(payload.restaurantId)) {
            return res.status(400).json({ error: "Restaurant does not exist" });
        }/*
        if (!await isArticleDeletable(payload.restaurantId,payload.articleId)) {
            return res.status(400).json({ error: "Restaurant does not exist" });
        }*/
        if (await getArticle(payload.restaurantId,payload.articleId)) {
            return res.status(200).json({ status: "Article delete",user:await deleteArticle(payload.restaurantId,payload.articleId)});
        }
        else
            return res.status(400).json({ error: "Article does not exist" });
    });
export default articleRouter;
