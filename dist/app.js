// Libraries
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
const CLIENT_URL = String(process.env.CLIENT_URL);
const PORT = Number(process.env.PORT);
const MONGODB_URI = String(process.env.MONGODB_URI);
const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
// Start server
async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);
        app.listen(PORT);
        console.log("Hello2");
    }
    catch (error) {
        console.error(`Server error while starting: ${error}`);
    }
}
startServer();
//# sourceMappingURL=app.js.map