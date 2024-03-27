import { HttpError } from "../helpers/HttpError.js";
import { prisma } from "../lib/db.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.create({
      data: {
        password,
        username,
      },
    });
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    const userWithToken = await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });
    return res.json({
      data: {
        user: { username: userWithToken.username, id: userWithToken.id, token: userWithToken.token },
        message: "User successfully created",
      },
    });
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
        password,
      },
    });
    if (!user) {
      throw HttpError(401, { message: "Email or password is wrong" });
    }
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    const userWithToken = await prisma.user.update({ where: { username }, data: { token } });

    return res.status(200).send({
      data: {
        user: { username: userWithToken.username, id: userWithToken.id, token: userWithToken.token },
        message: "Logged in succesfully",
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { id } = req.body;
    await prisma.user.update({ where: { id }, data: { token: "" } });
    return res.status(200).send({
      data: {
        message: "Successfully logout",
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { id } = JSON.parse(req.cookies.user);
    const user = await prisma.user.findFirst({ where: { id } });

    return res.status(200).send({
      data: {
        user,
      },
    });
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
