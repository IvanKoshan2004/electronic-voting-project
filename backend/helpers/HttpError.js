export function HttpError(statusCode, details = {}) {
  const errorMessages = {
    400: "Bad Request",
    401: "Not authorized",
    404: "Not Found",
  };
  if (!errorMessages[statusCode]) {
    throw Error("Unknown status code");
  }
  const error = new Error(errorMessages[statusCode]);
  error.status = statusCode;
  error.details = details;
  return error;
}
