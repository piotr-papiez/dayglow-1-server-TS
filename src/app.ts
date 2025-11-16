// Libraries
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const PORT: number = Number(process.env.PORT);
const MONGODB_URI: string = String(process.env.MONGODB_URI);

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

// Start server
async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);
        app.listen(PORT);
        console.log("Hello2");
    } catch (error) {
        console.error(`Server error while starting: ${error}`);
    }
}

startServer();