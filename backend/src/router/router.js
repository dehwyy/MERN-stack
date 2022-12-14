import { Router } from "express"
import UserController from "../controllers/UserController.js"
import userController from "../controllers/UserController.js"
import expressValidator from "express-validator"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = new Router()

router.get("/", authMiddleware,UserController.getAllUsers)
router.post("/registration",
  expressValidator.body("email").isEmail(),
  expressValidator.body("password").isLength({min: 4}),
  UserController.reg)
router.post("/login", userController.login)
router.get("/activate/:activationLink", userController.activateAccount)
router.post("/logout", userController.logout)
router.get("/refresh", userController.refresh)

export default router