import express, { Request, Response } from "express";
const router = express.Router();
const {createJWT,checkJWT} = require("../modules/jwt")

router.get('/create',(request:Request,response:Response,next)=>{
    response.status(200).json({token: createJWT({name:"popo",role:"admin"})});
    next();
});

router.get('/verify',(request:Request,response:Response,next)=>{
    if (!request.body.token)
        return response.status(400).json({"error":"pas de jwt"})
    response.status(200).json({"verify":checkJWT(request.body.token)});
    next();
});

export default router;
