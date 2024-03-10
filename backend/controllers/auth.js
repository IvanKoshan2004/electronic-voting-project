import { HttpError } from "../helpers/HttpError.js";
import { prisma } from "../lib/db.js";

const COOKIE_MAX_AGE_MILISECONDS = 60 * 60 * 1000;

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.create({
      data: {
        password,
        username,
      },
    });
    return res
      .cookie("user", JSON.stringify(user), {
        maxAge: COOKIE_MAX_AGE_MILISECONDS,
      })
      .json({ data: user });
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

    return res
      .cookie("user", JSON.stringify({ username: user.username, id: user.id }))
      .status(200)
      .send({
        data: {
          message: "Logged in succesfully",
        },
      });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie("user", "")
      .send({
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
