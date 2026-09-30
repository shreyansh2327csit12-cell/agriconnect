import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

// Custom Hook for Socket Connection
export const useSocket = (auctionId) => {
    const socket = useMemo(() => io(import.meta.env.VITE_API_URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        transports: ["websocket"],
    }), []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
            if (auctionId) {
                socket.emit("joinAuction", auctionId);
                console.log(`Joined auction room: ${auctionId}`);
            }
        });

        socket.on("connect_error", (err) => {
            console.error("Connection Error:", err);
        });

        return () => {
            // socket.disconnect();
        };
    }, [socket, auctionId]);

    return socket;
};

// Function to place a bid
export const placeBid = (socket, auctionId, bidAmount, userId) => {
    if (!socket || !socket.connected) {
        console.error("Socket not connected!");
        return;
    }
    socket.emit("placeBid", { auctionId, bidAmount, userId });
};

// Function to listen for bid updates
export const updateBid = (socket, callback) => {
    console.log("Listening for bid updates...");

    socket.on("bidUpdate", (data) => {
        console.log("Received bid update:", data);
        callback(data);
    });
};
