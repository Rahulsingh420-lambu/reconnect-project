import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import personRoutes from "./routes/personRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/persons", personRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;