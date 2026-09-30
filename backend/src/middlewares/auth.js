import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import {config} from "../config/config.js"
import pkg from 'jsonwebtoken';
const { verify } = pkg;
const authenticate = (req, res, next) => {
 
    const token = req.header("Authorization");
    if(!token){
        return next(createHttpError(401,"auth token required"))
    }
    const parsedToken = token.split(" ")[1];

    try {
        const isVerified = verify(parsedToken,config.jwtSecret)
        //  console.log(isVerified.sub);
         req.userId = isVerified.sub ;
        next()
    
    } catch (error) {
        return next(createHttpError(401,"token expired"))
    }
};

export default authenticate;