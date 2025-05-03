import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  uploadFileGet,
  uploadFilePost,
  fileInfoGet,
  downloadFile,
} from "../controllers/file.controller.js";

const router = express.Router();

router.get("/upload-file/:id", isAuthenticated, uploadFileGet);
router.post("/upload-file", isAuthenticated, uploadFilePost);
router.get("/file-info/:id", isAuthenticated, fileInfoGet);
router.get("/download/:id", isAuthenticated, downloadFile);

export default router;
