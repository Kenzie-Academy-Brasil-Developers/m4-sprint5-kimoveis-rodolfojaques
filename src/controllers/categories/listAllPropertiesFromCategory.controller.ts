import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listAllPropertiesFromCategoryService from "../../services/categories/listAllPropertiesFromCategory.service";

const listAllPropertiesFromCategoryController = async (req:Request, res:Response) => {
    try {
        const { id } = req.params

        const propertiesFromCategory = await listAllPropertiesFromCategoryService(id)

        return res.json(instanceToPlain(propertiesFromCategory))
    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default listAllPropertiesFromCategoryController