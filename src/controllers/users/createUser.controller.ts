import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createUserService from "../../services/users/createUser.service";

import { instanceToPlain } from "class-transformer"

const createUserController = async (req:Request, res:Response) => {
    try {
        const { name,email,password,isAdm } = req.body

        const user = await createUserService({ name,email,password,isAdm })

        return res.status(201).json(instanceToPlain(user))
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default createUserController