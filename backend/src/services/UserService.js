import User from "../models/UserModel.js"
import MailService from "./MailService.js"
import TokenService from "./TokenService.js"
import { v4 } from "uuid"
import bcrypt from "bcryptjs"
import tokenService from "./TokenService.js"
import ErrorHandler from "../ErrorHandler/ErrorHandler.js"
import UserDTO from "../dtos/UserDTO.js"
import userDTO from "../dtos/UserDTO.js"
import userModel from "../models/UserModel.js"

class UserService {
  async get() {
    return User.find()
  }
  async reg(password, email) {
    const userInDb = await User.findOne({email})
    if (userInDb) {
      throw ErrorHandler.BadRequest("email is already in use")
    }
    try {
      const activationLink = v4()
      const hashPassword = bcrypt.hashSync(password, 4)
      const user = await new User({email, password: hashPassword, activationLink}).save()
      const data = new userDTO(user)
      const tokens = TokenService.generateTokens({ ...data })
      await MailService.sendMessage(data.email, `${process.env.API_URL}/activate/${activationLink}`)
      await tokenService.saveToken(user._id, tokens.refreshToken)
      return {...tokens, user}
    } catch (e) {
      throw ErrorHandler.BadRequest("bad request", e)
    }

  }
  async activeUser(activationLink) {
    const user = await User.findOne({activationLink})
    if (!user) throw ErrorHandler.BadRequest("invalid activationLink")
    user.isActivated = true
    await user.save()
  }
  async log(password, email) {
    const user = await User.findOne({email})
    if (!user) {
      throw ErrorHandler.AuthError("no user with such email")
    }
    const isPasswordsEquals = bcrypt.compareSync(password, user.password)
    if (!isPasswordsEquals) {
      throw ErrorHandler.AuthError("invalid password")
    }
    const data = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...data })
    await TokenService.saveToken(data.id, tokens.refreshToken)
    return {...tokens, data}
  }
  async logout(token) {
    await TokenService.removeToken(token)
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ErrorHandler.AuthError("not authed")
    }
    const refreshValidated = TokenService.validateRefreshToken(refreshToken)
    const userInDb = await TokenService.findUserByToken(refreshToken)
    if (!refreshValidated || !userInDb) {
      throw ErrorHandler.AuthError("error")
    }
    const user = await userModel.findById(userInDb.user)
    const userData = new userDTO(user)
    const tokens = TokenService.generateTokens({ ...userData })
    await tokenService.saveToken(userData.id, tokens.refreshToken)
    return {...tokens, user}
  }
}

export default new UserService()