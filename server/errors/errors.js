export class CustomErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createError = (message, statusCode) => {
  return new CustomErrorHandler(message, statusCode);
};
