import { Router } from "express"
import createUserController from "../controllers/users/createUser.controller"
import deleteUserController from "../controllers/users/deleteUser.controller"
import listUsersController from "../controllers/users/listUsers.controller"
import authUserMiddleware from "../middlewares/authUser.middleware"
import isAdmVerify from "../middlewares/isAdmVerify.middleware"

const userRouter = Router()

userRouter.post('', createUserController)
userRouter.get('', authUserMiddleware, isAdmVerify, listUsersController)
userRouter.delete('/:id', authUserMiddleware, isAdmVerify, deleteUserController)

export default userRouter