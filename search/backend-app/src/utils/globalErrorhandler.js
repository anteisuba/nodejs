export default function (err, _req, res, _next) {
  const {
    name = "Unknow error",
    message = "Something borke",
    statusCode = 500,
  } = err;
  res.status(statusCode).send(message);
}
