import express from "express";
import {createOrder, status} from "./paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/status", status);

export default paymentRouter;