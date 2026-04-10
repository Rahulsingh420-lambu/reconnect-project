const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/user");
import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/users", auth, admin, async (req, res) => {
  router.put("/verify/:id", protect, adminOnly, verifyPerson);
    router.delete("/:id", protect, adminOnly, deletePerson);
  const users = await User.find();
  res.json(users);
});

export default router;