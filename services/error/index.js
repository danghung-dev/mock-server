class ApiError extends Error {
  constructor(errors, statusCode) {
      super();
      this.name = 'ApiError';
      this.errors = errors;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  ApiError
}
