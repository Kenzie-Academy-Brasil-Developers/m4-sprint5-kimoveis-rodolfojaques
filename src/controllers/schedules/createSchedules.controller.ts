import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createScheduleService from "../../services/schedules/createSchedules.service";

const createScheduleController = async (req:Request, res:Response) => {
    try {
        const { date, hour, propertyId } = req.body
        const { userId } = req

        const schedule = await createScheduleService({date,hour,propertyId,userId})

        return res.status(201).json({
            message: schedule
        })

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default createScheduleController