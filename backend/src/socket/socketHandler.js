// serever side socket logic

import Auction from "../models/auctionModel.js";
import userModel from "../models/userModel.js";

export const setupAuctionHandlers = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinAuction", (auctionId) => {
      socket.join(auctionId);
      console.log(`User ${socket.id} joined auction room: ${auctionId}`);
    });

    // Handle bid placement
    socket.on("placeBid", async ({ auctionId, bidAmount, userId }) => {
      console.log("Bid placed:", { auctionId, bidAmount, userId });
      try {
        // 1. Fetch auction from MongoDB
        const auction = await Auction.findById(auctionId);
        const user = await userModel.findById(userId);

        if (!auction) {
          return socket.emit("bidError", "Auction not found");
        }
        if (!user) {
          return socket.emit("bidError", "User not found");
        }
        if (user.role === "farmer") {
          return socket.emit("bidError", "Farmer cannot bid");
        }
        // 2. Validate auction status
        if (auction.status !== "open") {
          return socket.emit("bidError", "Auction has closed");
        }

        // 3. Validate bid amount
        if (bidAmount <= auction.currentBid) {
          return socket.emit(
            "bidError",
            `Bid must be higher than current $${auction.currentBid}`
          );
        }

        // 4. Update in MongoDB

        const updateBid = async (auctionId, bidAmount, userId) => {
          try {
            // Fetch the auction
            if (!auction) {
              throw new Error("Auction not found");
            }

            // Find existing bid by the same user
            const existingBid = auction.highestBidder.find(
              (bid) => bid.user.toString() === userId
            );
            console.log("Existing bid:", existingBid);

            if (existingBid) {
              // Update bid amount only if the new bid is higher
              console.log("Updating existing bid:", {
                userId,
                userName: user.name,
                amount: bidAmount,
              });
              if (bidAmount > existingBid.amount) {
                existingBid.amount = bidAmount;
                existingBid.bidTime = new Date();
              } else {
                throw new Error(
                  "New bid must be higher than your previous bid"
                );
              }
            } else {
              // Push a new bid if the user hasn't bid before
              console.log("Pushing new bid:", {
                userId,
                userName: user.name,
                amount: bidAmount,
              });
              auction.highestBidder.push({
                user: userId,
                userName: user.name,
                amount: bidAmount,
                bidTime: new Date(),
              });
            }

            // Sort bids in descending order & keep only the top 3
            auction.highestBidder.sort((a, b) => b.amount - a.amount);
            if (auction.highestBidder.length > 3) {
              auction.highestBidder = auction.highestBidder.slice(0, 3);
            }

            // Update currentBid (highest bid)
            auction.currentBid = auction.highestBidder[0]?.amount || 0;

            // Save the updated auction
            await auction.save();

            return auction; // Return the updated auction object
          } catch (error) {
            throw error;
          }
        };

        const updatedAuction = await updateBid(auctionId, bidAmount, userId);
        console.log(updatedAuction);
        // 5. Broadcast to all room participants
        io.to(auctionId).emit("bidUpdate", {
          auctionId,
          currentBid: updatedAuction.currentBid,
          newBid: updatedAuction.currentBid,
          highestBidder: updatedAuction.highestBidder,
        });
      } catch (error) {
        console.error("Bid processing error:", error);
        socket.emit("bidError", "Failed to process bid");
      }
    });

    // Other handlers...
  });
};
