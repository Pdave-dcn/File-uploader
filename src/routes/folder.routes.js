import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  openFolder,
  updateFolderGet,
  updateFolderPost,
  deleteFolder,
} from "../controllers/folder.controller.js";

const router = express.Router();

router.get("/folder/:id", isAuthenticated, openFolder);

router.get("/folder/:id/update", isAuthenticated, updateFolderGet);
router.post("/folder/:id/update", isAuthenticated, updateFolderPost);

router.post("/folder/:id/delete", isAuthenticated, deleteFolder);

export default router;
