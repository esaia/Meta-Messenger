import Users from "../schema/userSchema.js";
import Tokens from "../schema/refreshTokens.js";
import bcrypt from "bcrypt";
import { createError } from "../errors/errors.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "25s",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.REFRESH_TOKEN
  );
};

export const register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const findUser = await Users.findOne({ username });

    if (findUser && findUser?.username === username) {
      return next(createError("user already exists", 502));
    }

    let user;
    if (req.file) {
      user = await Users.create({
        ...req.body,
        password: hash,
        image: req?.file?.path,
      });
    } else {
      user = await Users.create({
        ...req.body,
        password: hash,
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      });
    }

    // await Users.deleteMany({});

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const findUser = await Users.findOne({ username: req.body.username });
    if (!findUser) return next(createError("user not found", 404));
    const { _id, username, email, image } = findUser;
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (!isPasswordMatch)
      return next(createError("password is incorrect", 404));

    // JWT SIGN IN

    const accessToken = generateAccessToken({
      id: _id,
      username,
    });
    const refreshToken = generateRefreshToken({
      id: _id,
      username,
    });

    await Tokens.create({ refreshToken });

    return res
      .status(201)
      .json({ _id, username, email, image, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.body.token;
  await Tokens.findOneAndDelete({ refreshToken });

  res.json("user has been logged out");
};

export const refresh = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) next(createError("You are not authenticated", 401));
  const token = await Tokens.findOne({ refreshToken });
  if (!token) return next(createError("Refresh Token is Invalid", 403));
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, user) => {
    if (err) next(createError("SOmething went wrong", 401));
    await Tokens.findOneAndDelete({ refreshToken: refreshToken });
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await Tokens.create({ refreshToken: newRefreshToken });

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
};
