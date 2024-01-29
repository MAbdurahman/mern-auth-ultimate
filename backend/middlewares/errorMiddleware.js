
 export const errorMiddlewareHandler = (err, req, res, next) => {
    res.status(500).json({ error: err.message || err });
 };