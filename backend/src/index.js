import express from 'express';
import dotenv from "dotenv";
import postsRouters from "./routes/postsRouters.js";
import { connectDB } from "./config/db.js";

// Load env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/social/api", postsRouters);

// Start server
app.listen(5002, () => {
  console.log('Server is running on port 5002');
});