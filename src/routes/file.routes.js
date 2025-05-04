import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  uploadFileGet,
  uploadFilePost,
  fileInfoGet,
  downloadFile,
  deleteFile,
} from "../controllers/file.controller.js";

const router = express.Router();

router.get("/upload-file/:id", isAuthenticated, uploadFileGet);
router.post("/upload-file", isAuthenticated, uploadFilePost);

router.get("/file-info/:id", isAuthenticated, fileInfoGet);
router.get("/download/:id", isAuthenticated, downloadFile);

router.post("/file/:id/delete", isAuthenticated, deleteFile);

export default router;
