import { HttpError } from "../helpers/HttpError.js";

export const validateBody = zodSchema => {
  return (req, res, next) => {
    const body = req.body;
    const { success, error } = zodSchema.safeParse(body);
    if (!success) {
      const { issues } = error;
      return next(HttpError(400, { message: issues[0].message }));
    }
    next();
  };
};
