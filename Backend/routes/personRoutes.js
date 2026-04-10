import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

import {
  getAll,
  getMissing,
  getFound,
  addPerson,
  updatePerson,
  deletePerson,
} from "../controllers/personController.js";

const router = express.Router();

// GET
router.get("/", getAll);
router.get("/missing", getMissing);
router.get("/found", getFound);

// POST
router.post("/", upload.single("image"), addPerson);
// PUT
router.put("/:id", protect, upload.single("image"), updatePerson);

// DELETE
router.delete("/:id", protect, deletePerson);

export default router;