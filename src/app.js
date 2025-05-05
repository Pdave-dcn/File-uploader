import express from "express";
import route from "./routes/appRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import initializePassport from "./config/passport.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      ttl: 2 * 24 * 60 * 60 * 1000,
      disableTouch: false,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// app.use((req, res, next) => {
//   console.log("Cookies received:", req.headers.cookie);
//   console.log("Session ID:", req.sessionID);
//   console.log("Is Authenticated:", req.isAuthenticated());
//   next();
// });
app.use("/", route);

export default app;
