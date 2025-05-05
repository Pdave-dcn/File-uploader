import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../config/db.js";
import passport from "passport";

const validateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Must contain letters and spaces only"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const signupPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const { name, email } = req.body;

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      req.login(newUser, (err) => {
        if (err) return next(err);
        res.redirect("/dashboard");
      });
    } catch (error) {
      console.error("Error in signupPost: ", error);
      res.status(500).render("signup", {
        errors: [{ msg: "Something went wrong. Please try again." }],
      });
    }
  },
];

export const loginPost = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.render("login", {
        errors: [{ msg: "Something went wrong. Please try again." }],
      });
    }

    if (!user) {
      return res.render("login", {
        errors: [{ msg: info?.message || "Invalid email or password" }],
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.render("login", {
          errors: [{ msg: "Login failed. Please try again." }],
        });
      }

      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.render("login", {
            errors: [{ msg: "Session error. Please try again." }],
          });
        }
        return res.redirect("/dashboard");
      });
    });
  })(req, res, next);
};
