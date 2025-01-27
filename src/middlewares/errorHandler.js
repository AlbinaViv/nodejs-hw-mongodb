export const errorHandler = (error, req, res) => {
  const { status = 500, message = 'Something went wrong' } = error;
  res.status(status).json({
    status,
    message,
    data: message,
  });
};
