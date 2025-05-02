import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  uploadFileGet,
  uploadFilePost,
} from "../controllers/file.controller.js";

const router = express.Router();

router.get("/upload-file/:id", isAuthenticated, uploadFileGet);
router.post("/upload-file", isAuthenticated, uploadFilePost);

export default router;
