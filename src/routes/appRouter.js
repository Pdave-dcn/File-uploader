import express from "express";
import authRoutes from "./auth.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import folderRoutes from "./folder.routes.js";
import fileRoutes from "./file.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.use("/", authRoutes);
router.use("/", dashboardRoutes);
router.use("/", folderRoutes);
router.use("/", fileRoutes);

export default router;
