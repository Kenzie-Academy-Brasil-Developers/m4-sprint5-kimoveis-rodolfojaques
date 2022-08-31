import { Router } from "express"
import createPropertyController from "../controllers/properties/createProperty.contrller"
import listPropertiesController from "../controllers/properties/listProperties.controller"
import authUserMiddleware from "../middlewares/authUser.middleware"
import isAdmVerify from "../middlewares/isAdmVerify.middleware"

const propertyRouter = Router()

propertyRouter.post('', authUserMiddleware, isAdmVerify, createPropertyController)
propertyRouter.get('', listPropertiesController)

export default propertyRouter