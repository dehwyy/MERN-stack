import ErrorHandler from "../ErrorHandler/ErrorHandler.js"

const errorMiddleware = (err, req, res, middleware) => {
  console.log(err)
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }
  return res.status(500).json({message: "server error"})
}

export default errorMiddleware