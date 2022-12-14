class ErrorHandler extends Error{
  constructor(status, message, errors) {
    super(message)
    this.status = status
    this.errors = errors
  }
  static BadRequest(message, errors = []) {
    return new ErrorHandler(400, message, errors)
  }
  static AuthError(message, errors = []) {
    return new ErrorHandler(401, message, errors)
  }
}

export default ErrorHandler