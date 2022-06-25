import {constants, userInfo} from "os";

const jwt = require('jsonwebtoken');

const token = "AZERTY"

const createJWT = (user:String) => {
    return jwt.sign({
        user: user
    },"AZERTY",{ expiresIn : "1h"} );
}

const checkJWT = (token:string) :boolean=> {
    jwt.verify(token,"AZERTY",(err, decoded) =>{
        console.log(decoded);
        return !err;
    });
    return true;
}

module.exports = {createJWT: createJWT, checkJWT: checkJWT}
