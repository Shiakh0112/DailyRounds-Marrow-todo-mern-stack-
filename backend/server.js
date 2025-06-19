import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // JSON parser

app.use("/api/todos", todoRoutes); // Todo routes
app.use("/api/users", userRoutes); // User routes

app.use(errorHandler); // Global error handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
