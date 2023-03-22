import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import { connectDB } from "./database.js";
import { noteFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/error-handler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// middleware
dotenv.config();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

// app.use(express.static("public"));
app.use("/images", express.static("images"));

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

app.use(noteFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(8800, () => console.log(" app listening on port 3000!"));
  } catch (error) {
    console.log(error);
  }
};

start();
