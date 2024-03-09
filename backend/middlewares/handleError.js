export function handleError(err, req, res, next) {
  const { status = 500, message = "Server error", details = {} } = err;
  console.log(message);
  res.status(status).json({ message, details });
}
