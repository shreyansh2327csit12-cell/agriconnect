import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags:{
        type: Array,
        required: true,
    },
    comments:{
        type: Array,
        default: [],
    },
},{timestamps: true});

export default mongoose.model("Forum", forumSchema);