import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req:Request, res:Response) => {
    try {
        const { id } = req.params

        const userDeleted = await deleteUserService(id)

        return res.status(204).json()

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default deleteUserController