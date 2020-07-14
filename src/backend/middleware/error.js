async function errorMiddleware(err, req, res, next) {
  let status = 500;
  let message = 'Unknown error occurred';

  return res
    .status(status)
    .json({ status, message });
}

export default errorMiddleware;
