import createHttpError from "http-errors";
import auctionModel from "../models/auctionModel.js";
import userModel from "../models/userModel.js";
import sendSMS from "../middlewares/twilioService.js";
import js from "@eslint/js";
async function createAuction(req, res, next) {
  const {
    product,
    startingBid,
    unit,
    harverstDate,
    minBidIncrement,
    duration,
    pickupLocation,
    quantity,
    quality,
    description,
    category,
    images,
    certifications,
  } = req.body;

  if (!product || !startingBid || !quantity) {
    return next(
      createHttpError(
        400,
        "Product name, quantity, and starting price are required"
      )
    );
  }
  console.log(req.body);
  try {
    const newAuction = await auctionModel.create({
      ...req.body,
      farmerId: req.userId,
      currentBid: startingBid,
    });
    res.status(201).json(newAuction);
  } catch (error) {
    if (error.code === 11000) {
      return next(createHttpError(409, "Auction already exists"));
    }
    if (error.name === "ValidationError") {
      return next(createHttpError(400, error.message));
    }
    next(error);
  }
}

async function getAuctions(req, res, next) {
  try {
    const auctions = await auctionModel.find().populate({path: 'farmerId', select: 'name'});
    console.log(auctions);
    res.json(auctions);
  } catch (error) {
    next(error);
  }
}

async function updateAuction(req, res, next) {
  try {
    const updatedAuction = await auctionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAuction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.status(200).json(updatedAuction);
  } catch (error) {
    next(error);
  }
}

const isOwner = async (req, res, next) => {
  try {
    const auction = await auctionModel.findById(req.params.id);
    if (auction.farmerId.toString() !== req.userId) {
      return next(
        createHttpError(403, "You are not the owner of this auction")
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const getAuctionById = async (req, res, next) => {
  try {
    console.log("Fetching auction details... of", req.params.id);
    const auction = await auctionModel.findById(req.params.id);
    if (!auction) {
      return next(createHttpError(404, "Auction not found"));
    }
    res.json(auction);
  } catch (error) {
    next(error);
  }
};

const updateAuctionStatus = async (req, res, next) => {
  try {
    const auction = await auctionModel.findById(req.params.id);

    if (!auction) {
      return next(createHttpError(404, "Auction not found"));
    }
    auction.status = req.body.status;

    await auction.save();
    console.log("Fetching farmer details...");
    const user = await userModel.findById(auction.farmerId);

    if (user) {
      try {
        await sendSMS("+91" + user.phone, "BSDK Your auction has been closed");
        console.log("SMS sent successfully!");
      } catch (error) {
        console.error("Error sending SMS:", error);
      }
    } else {
      console.log("User not found, SMS not sent.");
    }

    res.json(auction);
  } catch (error) {
    console.error("Error in updateAuctionStatus:", error);
    next(error);
  }
};


const getMyAuctions = async (req, res, next) => {
  try {
    // const auctions = await auctionModel.find({ farmerId: req.userId });
    const auctions = await auctionModel.find({ farmerId: req.userId }).populate({path: 'farmerId', select: 'name'});
    res.json(auctions);
  } catch (error) {
    next(error);
  }
}



async function deleteAuction(req, res, next) {
  try {
    const deletedAuction = await auctionModel.findByIdAndDelete(req.params.id);
    if (!deletedAuction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.status(204).send(json({ message: "Auction deleted successfully" }));
  } catch (error) {
    next(error);
  }
}


export { createAuction, updateAuction, getAuctions, isOwner, getAuctionById, updateAuctionStatus, getMyAuctions, deleteAuction };
