import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["farmer", "vendor","admin"],
        // default: "vendor",
    },
    phone: {
        type: String,
        unique: true
    },
    location:{
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false,
    },
    bannerImage: {
        type: String,
        required: false,
    },
    experience: {
        type: String,
        required: false,
    },
    // about: {
    //     type: String,
    //     required: false,
    // },
    acceptedOrders:{
        type: Array,
        default: [],
    }
},
{
    timestamps: true,    
}

);

const userModel = mongoose.model("User", userSchema);
export default userModel;