import express from "express";
import { login, register, logout, refresh } from "../controllers/auth.js";
import multer from "multer";
import jwt from "jsonwebtoken";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + "-" + file.originalname);
  },
});

export const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader?.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(403).json("Token is invalid");
      } else {
        req.currentUser = user;
        next();
      }
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
const upload = multer({ storage: storage });

router.route("/login").post(login);
router.route("/register").post(upload.single("image"), register);
router.route("/logout").post(verify, logout);
router.route("/refresh").post(refresh);

export default router;
