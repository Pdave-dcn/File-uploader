import express from "express";
import { signupPost, loginPost } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", signupPost);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", loginPost);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/");
  });
});

export default router;
