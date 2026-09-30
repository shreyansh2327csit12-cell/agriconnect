import createHttpError from "http-errors"
import farmProductModel from "./farmProductModel.js"

const postFarmProduct = async (req, res) => {
    const { id, title, price, description, rating, imageUrl, link  } = req.params;
    if(!id || !title || !price || !description || !rating || !imageUrl || !link){
        return createHttpError(400,"missing farm product data")
    }
    try{
        const existing = await farmProductModel.findById(id)
        if(existing){
            return createHttpError(202, "Already exists");
        }
        const newFarmProduct = await farmProductModel.create({
            id, title, price, description, rating, imageUrl, link
        })
        res.status(201).json(newFarmProduct)
    }catch(error){
        return createHttpError(500,"error while getting farm product")
    }
}

const getFarmProduct = async (req, res) => {
    try {
        const farmProduct = await farmProductModel.getFarmProduct();
        if (!farmProduct) {
            return res.status(404).json({ message: "Farm product not found" });
        }
        res.status(200).json(farmProduct);
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ message: "Error while fetching farm product" });
    }
}
export default {postFarmProduct, getFarmProduct}