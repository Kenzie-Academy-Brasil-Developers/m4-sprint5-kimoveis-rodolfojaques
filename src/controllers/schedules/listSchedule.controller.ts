import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listScheduleService from "../../services/schedules/listSchedule.service";

const listScheduleController = async (req:Request, res:Response) => {
    try {
        const { id } = req.params

        const schedules = await listScheduleService(id)

        return res.json(instanceToPlain(schedules))

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default listScheduleController