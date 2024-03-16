import { HttpError } from "../helpers/HttpError.js";
import { prisma } from "../lib/db.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { user } = req.cookies;
    if (!user) {
      return next(HttpError(401));
    }
    const { id } = JSON.parse(user);
    const dbUser = prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!dbUser) {
      return next(HttpError(401));
    }
    next();
  } catch (error) {
    next(error);
  }
};
