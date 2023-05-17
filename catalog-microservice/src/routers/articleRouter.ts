import { Router, Response } from "express";
import {ReqWithBody,ReqWithParams} from "../types/expressTypes";
import {
    articleExist,
    createArticle, getArticle, getArticles,
    isArticleGoodFormat, deleteArticle, isArticleUpdateGoodFormat, updateArticle, isArticleDeletable
} from "../controllers/articleController";
import GetArticlePayload from "../types/article/GetArticlePayload";
import {getRestaurant, restaurantExistByIdRestaurant} from "../controllers/restaurantController";
import GetArticlesPayload from "../types/article/GetArticlesPayload";
import DeleteArticlePayload from "../types/article/DeleteArticlePayload";
const articleRouter = Router({mergeParams: true});


articleRouter.post("/",
    async (req: any, res: Response) => {
        const payload = JSON.parse(JSON.stringify(req.body));
        const restaurantId = req.params.restaurantId;
        const testFormatted = isArticleGoodFormat(payload);
        if (!payload)
            return res.status(400).json({error:"No Body"});
        if (!testFormatted.error)
        {
            if (!restaurantId)
                return res.status(400).json({error:"Restaurant id not found"});
            if (!await getRestaurant(restaurantId))
                return res.status(400).json({error:"restaurant doesn't exist'"});
            if (!payload.currency)
                payload.currency = "€";
            const addedArticle = await createArticle(payload,restaurantId);
            return res.status(201).json({status: "Article registered", article: addedArticle});
        }
        else{
            return res.status(400).json({error:testFormatted?.error?.message});
        }
});


articleRouter.get("/:articleId",async (req: ReqWithParams<GetArticlePayload>, res: Response) => {
    const payload = req.params;
    if (!payload.articleId || !payload.restaurantId) {
        return res.status(400).json({error: "Restaurant or Article ID missing"});
    }
    if (!await restaurantExistByIdRestaurant(payload.restaurantId)) {
        return res.status(400).json({error: "Restaurant does not exist"});
    }
    if (await articleExist(payload.restaurantId, payload.articleId)) {
        return res.status(200).json({
            status: "Article exist",
            article: await getArticle(payload.restaurantId, payload.articleId)
        });
    } else {
        return res.status(400).json({error: "Article does not exist"});
    }
});

articleRouter.get("/",
    async (req: ReqWithParams<GetArticlesPayload>, res: Response) => {
    const payload = req.params;
        let articles;
    try{
        articles = await getArticles(payload.restaurantId);
    }
    catch (e:any){
        console.log(e.message);
        return res.status(400).json({ error: "error" });
    }
    return res.status(200).json({ status: "Articles",articles});
    });

articleRouter.put("/:articleId",
    async (req: any, res: Response) => {
        const payload = JSON.parse(JSON.stringify(req.body));
        const restaurantId = req.params?.restaurantId;
        const articleId = req.params?.articleId;
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
                const addedArticle = await updateArticle(restaurantId,articleId,payload);
                return res.status(201).json({status: "Article registered", article: addedArticle});
            }
            else{
                return res.status(400).json({error:testFormatted?.error?.message});
            }
        }
        else
            return res.status(400).json({ error: "Article does not exist" });
    });

articleRouter.delete("/:articleId",
    async (req: ReqWithParams<DeleteArticlePayload>, res: Response) => {
        const payload = req.params;
        if (!payload.articleId || !payload.restaurantId) {
            return res.status(400).json({ error: "Article Id is required" });
        }
        if (!await restaurantExistByIdRestaurant(payload.restaurantId)) {
            return res.status(400).json({ error: "Restaurant does not exist" });
        }
        if (!await isArticleDeletable(payload.restaurantId,payload.articleId)) {
            return res.status(400).json({ error: "Article exists in menu" });
        }
        if (await getArticle(payload.restaurantId,payload.articleId)) {
            return res.status(200).json({ status: "Article delete",articleId:await deleteArticle(payload.restaurantId,payload.articleId)});
        }
        else
            return res.status(400).json({ error: "Article does not exist" });
    });
export default articleRouter;
