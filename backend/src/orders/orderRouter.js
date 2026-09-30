import express from "express";
import { get } from "http";
import {getOrdersByUserId} from "./orderController.js"


const orderRouter = express.Router();


orderRouter.get("/",getOrdersByUserId)