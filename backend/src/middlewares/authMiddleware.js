import ErrorHandler from "../ErrorHandler/ErrorHandler.js"
import TokenService from "../services/TokenService.js"

export default function(req, res, next) {
  try {
    const auth = req.headers.authorization
    const token = auth.split(" ")[1]
    const accessTokenValidation = TokenService.validateAccessToken(token)
    console.log("HERE")
    if (!token || !accessTokenValidation) {
      return next(ErrorHandler.AuthError("no token"))
    }
    console.log("HERE")
    req.user = accessTokenValidation
    next()
  } catch (e) {
    return next(ErrorHandler.AuthError("error in getting users"))
  }
}