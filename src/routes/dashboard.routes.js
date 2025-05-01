import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user, folders: [] });
});

export default router;
