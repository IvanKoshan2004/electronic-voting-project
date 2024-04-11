import { HttpError } from "../helpers/HttpError.js";
import { createApiResponse } from "../helpers/createApiResponse.js";
import { prisma } from "../lib/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const COOKIE_MAX_AGE_MILISECONDS = 60 * 60 * 1000;
const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        password: hashPassword,
        username,
      },
    });

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    return res
      .cookie("token", token, {
        maxAge: COOKIE_MAX_AGE_MILISECONDS,
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

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    return res
      .cookie("token", token)
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
      .status(200)
      .cookie("token", "")
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
