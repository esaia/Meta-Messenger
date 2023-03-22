import { CustomErrorHandler } from "../errors/errors.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorHandler) {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  } else {
    console.log(err);
    res.status(err.status || 500).json({
      err,
    });
  }
};
