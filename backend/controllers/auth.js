import { HttpError } from "../helpers/HttpError.js";
import { createApiResponse } from "../helpers/createApiResponse.js";
import { prisma } from "../lib/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "../lib/env.cjs";

const COOKIE_MAX_AGE_MILISECONDS = 60 * 60 * 1000;
const oneHourInMs = 60 * 60 * 1000;
const JWT_SECRET = env.JWT_SECRET;
const SALT = 10;
const expiresIn = `${COOKIE_MAX_AGE_MILISECONDS / oneHourInMs}h`;

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, SALT);

    const user = await prisma.user.create({
      data: {
        password: hashPassword,
        username,
      },
    });

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

    return res
      .cookie("token", token, {
        maxAge: COOKIE_MAX_AGE_MILISECONDS,
        httpOnly: true,
      })
      .json(createApiResponse({ user: { username: user.username, id: user.id } }));
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      throw HttpError(401, { message: "Email or password is wrong" });
    }

    let passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

    return res
      .cookie("token", token, { maxAge: COOKIE_MAX_AGE_MILISECONDS, httpOnly: true })
      .status(200)
      .send(
        createApiResponse({
          user: { username: user.username, id: user.id },
          message: "Logged in succesfully",
        }),
      );
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .send(
        createApiResponse({
          message: "Successfully logout",
        }),
      );
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findFirst({ where: { id } });

    return res.status(200).send(createApiResponse({ user: { username: user.username, id: user.id } }));
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  getCurrent,
};
