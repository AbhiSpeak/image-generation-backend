const notFound = (req, res, next) => {
  const error = new Error(`Path not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.send({
    success: false,
    message: err.message,
  });
};

const passInfo = {
  notFound,
  errorHandler,
};

export default passInfo;
