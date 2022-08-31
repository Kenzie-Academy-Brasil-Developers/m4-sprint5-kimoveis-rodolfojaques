import { Router } from "express"
import loginUserController from "../controllers/users/loginUser.controller"

const loginRouter = Router()

loginRouter.post('', loginUserController)

export default loginRouter