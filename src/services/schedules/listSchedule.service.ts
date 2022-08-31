import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { Schedules_users_properties } from "../../entities/schedules_users_properties.entity"
import { AppError } from "../../error/appError"

const listScheduleService = async (id:string) => {
    const scheduleRepository = AppDataSource.getRepository(Schedules_users_properties)
    const propertyRepository = AppDataSource.getRepository(Properties)

    const property = await propertyRepository.findOneBy({id:id})

    if(!property){
        throw new AppError(404,"Property not found")
    }



    return {...property}
}

export default listScheduleService