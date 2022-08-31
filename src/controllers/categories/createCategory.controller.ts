import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createCategoryService from "../../services/categories/createCategory.service";

const createCategoryController = async (req:Request, res:Response) => {
    try {
        const { name } = req.body

        const category = await createCategoryService({ name })
        return res.status(201).json(category)

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default createCategoryController