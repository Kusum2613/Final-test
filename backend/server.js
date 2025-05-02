import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import chatCustomizationRoutes from "./routes/chatCustomizationRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "React app URL");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: Date.now() });
});
connectDB();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);
app.use("/chats", chatRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/visitors", visitorRoutes);
app.use("/chatCustomization", chatCustomizationRoutes);

app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
