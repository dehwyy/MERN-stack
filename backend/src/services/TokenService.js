import jwt from "jsonwebtoken"
import Token from "../models/TokenModel.js"
import ErrorHandler from "../ErrorHandler/ErrorHandler.js"
import UserModel from "../models/UserModel.js"
import TokenModel from "../models/TokenModel.js"

class TokenService {
  generateTokens(payload) {
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {expiresIn: "30d"})
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS, {expiresIn: "30s"})
    return {
      refreshToken,
      accessToken
    }
  }
  async saveToken(id, token) {
    const user = await Token.findOne({user: id})
    if (user) {
      user.refreshToken = token
      return user.save()
    }
    return await new Token({user: id, refreshToken: token}).save()
  }
  async removeToken(refreshToken) {
    await Token.deleteOne({refreshToken})
  }
  validateAccessToken(token) {
    const sheesh = jwt.verify(token, process.env.SECRET_ACCESS)
    return sheesh
  }
  validateRefreshToken(token) {
    return jwt.verify(token, process.env.SECRET_REFRESH)
  }
  async findUserByToken(refreshToken) {
    const user = await TokenModel.findOne({refreshToken})
    return user
  }
}

export default new TokenService()