import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    transactionId: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },
     productId: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
    },

    merchantId: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },

   
},
{
    timestamps: true,    
}
);

export default mongoose.model("Order", orderSchema);