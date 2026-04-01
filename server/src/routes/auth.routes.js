const {Router} = require ('express')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")


const authRouter= Router()

authRouter.post("/register",authController.registerUserController)

authRouter.post("/login", authController.loginUserController)

authRouter.post("/logout",authController.logoutUserController)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

// Google Sign-In Route (using controller - recommended)
authRouter.post("/google", authController.googleLoginController);

module.exports = authRouter