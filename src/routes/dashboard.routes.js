import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createFolder } from "../controllers/folder.controller.js";
import getDashboard from "../controllers/dash.controller.js";

export const router = express.Router();

router.get("/dashboard", isAuthenticated, getDashboard);

router.get("/create-folder", isAuthenticated, (req, res) => {
  const parentId = req.query.parentId;
  res.render("createFolder", { parentId });
});
router.post("/create-folder", isAuthenticated, createFolder);

export default router;
