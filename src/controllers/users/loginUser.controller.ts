import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import loginUserService from "../../services/users/loginUser.service";

const loginUserController = async (req:Request, res:Response) => {
    try {
        const { email,password } = req.body

        const userLoged = await loginUserService({email,password})

        return res.status(200).json({token:userLoged})

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default loginUserController