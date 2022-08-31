import { Router } from "express"
import createCategoryController from "../controllers/categories/createCategory.controller"
import listAllPropertiesFromCategoryController from "../controllers/categories/listAllPropertiesFromCategory.controller"
import listCategoriesController from "../controllers/categories/listCategories.controller"
import authUserMiddleware from "../middlewares/authUser.middleware"
import isAdmVerify from "../middlewares/isAdmVerify.middleware"

const categoryRouter = Router()

categoryRouter.post('', authUserMiddleware, isAdmVerify, createCategoryController)
categoryRouter.get('', listCategoriesController)
categoryRouter.get('/:id/properties', listAllPropertiesFromCategoryController)

export default categoryRouter