import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import userRouter from "./users/userRouter.js";
import auctionRouter from "./auctions/auctionRouter.js";
import paymentRouter from "./payment/paymentRouter.js";
import forumRouter from "./forum/forumRouter.js";
import farmProductRoutes from "./routes/farmProductRoutes.js";

const app = express();

// Middleware
app.use(cors({
    origin: (origin, cb) => {
        // allow non-browser tools (no Origin header) and whitelisted frontends
        if (!origin || config.clientUrls.includes(origin)) return cb(null, true);
        cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "AgriConnect API is running" });
});
// Health check for Render / Railway
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.use("/api/users", userRouter);
app.use("/api/auctions", auctionRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/forums", forumRouter);
app.use("/api/products", farmProductRoutes);

// 404 Route
app.all("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Global error handler
app.use(globalErrorHandler);

export default app;