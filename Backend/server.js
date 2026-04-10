import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import personRoutes from "./routes/personRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ✅ ROUTES (IMPORTANT)
app.use("/api/auth", authRoutes);
app.use("/api/persons", personRoutes); // 🔥 THIS LINE MUST BE EXACT

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});