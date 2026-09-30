import userModel from "../models/userModel.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import { config } from "../config/config.js";
import pkg from "jsonwebtoken"; 
const { sign, verify } = pkg;  


const createUser = async (req, res, next) =>{

    const {name, email, phone, password, role} = req.body

    
    if (!name || !email || !phone || !password || !role) {
        return next(createHttpError(400, "All fields are required"));
    }

    if (!["farmer", "vendor"].includes(role)) {
        return next(createHttpError(400, "Invalid role"));
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return next(createHttpError(400, "User already exists"));
        }
    } catch (error) {
        console.error("Database Error:", error);
        return next(createHttpError(500, "Error while checking existing user"));
    }

    let newUser;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser = await userModel.create({
             name, 
             email, 
             phone,
             password: hashedPassword,
             role
            })
            

    } catch (error) {
        console.error("Database Error:", error);
        return next(createHttpError(500, "Error while creating new user"));
    }
    if (!config.jwtSecret) {
        console.error("JWT Secret is missing in config!");
        return next(createHttpError(500, "Internal server error"));
    }

    try {
        const token = sign({ sub: newUser._id }, config.jwtSecret, {
            expiresIn: "1h",    
            algorithm: "HS256",
        });

        res.status(201).json({ token,name:newUser.name,role:newUser.role,userId:newUser._id });
    } catch (error) {
        console.error("Token Generation Error:", error);
        return next(createHttpError(500, "Error while creating token"));
    }
    //





}


const loginUser = async (req, res, next) =>{

        const {email,password} = req.body;
        if(!email || !password){
            const error = createHttpError(400, "All fields are required");
            return next(error); // passing err to global err handler  to client 
        }
    //check user in db or not

    let user 
    try {
        user = await userModel.findOne({email});
        if(!user){
            const error = createHttpError(404, "User not found");
            return next(error); // passing err to global err handler  to client 
        }
    } catch (error) {
        return next(createHttpError(500,"error while getting user"));   
    }
    //check password
    let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        const error = createHttpError(401, "incorrect password");
        return next(error); // passing err to global err handler  to client
      }
  } catch (error) {
    return next(createHttpError(500,"error while comparing password"));   
  }


    //handle err? 
    try {
            //create access token
    // token generation --> sub is the payload which is the user id and swcond param is the secret
 
        const token = sign({sub:user._id},
            config.jwtSecret ,{
            expiresIn:"7d",
            algorithm:"HS256"
            }
        )
        
            res.json({token,role:user.role,name:user.name,userId:user._id});
    } catch (err) {
        return next(createHttpError(500,"error while creating token"));
    }




}

const farmerInfo = async (req, res, next) =>{
    console.log(req.params.userId)
    try {
        const farmer = await userModel.findById(req.params.userId)
        .select("-password -__v  -createdAt -updatedAt -_id");

        if(!farmer || farmer.role !== "farmer"){
            return next(createHttpError(404, "Farmer not found"));
        }
        res.json(farmer);

    } catch (error) {
        console.log("error while getting farmer info");
        next(error);
    }
}

const vendorInfo = async (req, res, next) =>{
    console.log(req.params.userId)
    try {
        const vendor = await userModel.findById(req.params.userId)
        .select("-password -__v  -createdAt -updatedAt -_id");

        if(!vendor || vendor.role !== "vendor"){
            return next(createHttpError(404, "Vendor not found"));
        }
        res.json(vendor);

    } catch (error) {
        console.log("error while getting vendor info");
        next(error);
    }
}


const editUserById = async (req, res, next) =>{
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.userId,req.body,{new:true});
        if(!updatedUser){
            return next(createHttpError(404, "User not found"));
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
}
}


const acceptOrder = async (req, res, next) =>{
    try{
        const {userId,auctionId}=req.body;
        const users = await userModel.findById(userId);
        
        if(!users){
            return next(createHttpError(404, "User not found"));
        }
        users.orders.push({auctionId,status:"pending"});
        await users.save();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export {createUser, loginUser, farmerInfo, vendorInfo,editUserById,acceptOrder}