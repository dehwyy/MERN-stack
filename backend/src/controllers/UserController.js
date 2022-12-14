import UserService from "../services/UserService.js"
import expressValidator from "express-validator"
import ErrorHandler from "../ErrorHandler/ErrorHandler.js"
import userService from "../services/UserService.js"
class UserController {
  async getAllUsers(req, res) {
      const users = await UserService.get()
      return res.json(users)
  }
  async reg(req, res, next) {
    try {
      const errors = expressValidator.validationResult(req)
      if (!errors.isEmpty()) {
        return next(ErrorHandler.BadRequest("error in validation", errors.array()))
      }
      const {password, email} = req.body
      const userData = await UserService.reg(password, email)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async activateAccount(req, res, next) {
    try {
      const link = req.params.activationLink
      await UserService.activeUser(link)
      return res.redirect("https://ya.ru/")
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await UserService.log(password, email)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      console.log(refreshToken)
     await UserService.logout(refreshToken)
      res.clearCookie("refreshToken")
      return res.json({message: "success"})
    } catch (e) {
      next(e)
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const refreshedData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', refreshedData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(refreshedData)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController();