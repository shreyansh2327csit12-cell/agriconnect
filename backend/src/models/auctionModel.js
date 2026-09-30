// import { duration } from "@mui/material";
import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    quality: {
      type: String,
      enum: ["grade-a", "grade-b", "grade-c", "Organic", "Natural"],
      default: "Natural",
      required: true,
    },

    unit: {
      type: String,
      enum: ["kg", "litre", "pounds"],
      default: "kg",
    },

    harvestDate: {
      type: String,
      required: true,
    },

    availibility: {
      type: Boolean,
      default: false,
    },

    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },
    startingBid: {
      type: Number,
      required: true,
    },
    currentBid: {
      type: Number,
      default: 0,
    },
    minBidIncrement: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    duration: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    //   createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },

    highestBidder: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        userName: {
          type: String,  
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        bidTime: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    certifications: {
      type: Array,
    //   default: "non gmo",
    }

    
  },
  { timestamps: true }
);

const auctionModel = mongoose.model("Auction", auctionSchema);
export default auctionModel;
