import express from "express";
import authRoutes from "./auth.routes.js";
import dashboardRoutes from "./dashboard.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.use("/", authRoutes);
router.use("/", dashboardRoutes);

export default router;
