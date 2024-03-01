const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const responseBody = {
    error: {
      message: err.message || 'Internal Server Error',
    },
  };
  res.status(status).json(responseBody);
};

module.exports = errorHandlerMiddleware;
