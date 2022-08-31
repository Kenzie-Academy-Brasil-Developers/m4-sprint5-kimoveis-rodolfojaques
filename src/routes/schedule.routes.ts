import { Router } from "express"
import createScheduleController from "../controllers/schedules/createSchedules.controller"
import listScheduleController from "../controllers/schedules/listSchedule.controller"
import authUserMiddleware from "../middlewares/authUser.middleware"
import isAdmVerify from "../middlewares/isAdmVerify.middleware"

const scheduleRouter = Router()

scheduleRouter.post('', authUserMiddleware, createScheduleController)
scheduleRouter.get('/properties/:id', authUserMiddleware, isAdmVerify, listScheduleController)

export default scheduleRouter