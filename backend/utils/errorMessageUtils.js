

export const errorMessageHandler = (res, error, statusCode = 401) =>
   res.status(statusCode).json({ error });