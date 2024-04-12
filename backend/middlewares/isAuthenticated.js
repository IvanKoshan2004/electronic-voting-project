import { HttpError } from "../helpers/HttpError.js";
import { prisma } from "../lib/db.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(HttpError(401));
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    if (!id) {
      return next(HttpError(401));
    }
    next();
  } catch (error) {
    next(error);
  }
};
