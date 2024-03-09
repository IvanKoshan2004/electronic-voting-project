import { HttpError } from "../helpers/HttpError.js";

export const isBodyEmpty = (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, { message: "Missing fields" }));
  }
  next();
};
