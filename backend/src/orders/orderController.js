import createHttpError from "http-errors"
import orderModel from "./orderModel.js"


const  getOrdersByUserId = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.params.userId})
        res.json(orders)
    } catch (error) {
       return createHttpError(500,"error while getting orders")
    }
}



export default {getOrdersByUserId}