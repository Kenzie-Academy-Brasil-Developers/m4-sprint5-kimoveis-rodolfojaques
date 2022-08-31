import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules_users_properties } from "../../entities/schedules_users_properties.entity";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({date,hour,propertyId,userId }:IScheduleRequest) => {
    const scheduleRepository = AppDataSource.getRepository(Schedules_users_properties)
    const propertyRepository = AppDataSource.getRepository(Properties)
    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({id: userId})
    const property = await propertyRepository.findOneBy({id: propertyId})


    const propertyAlreadyExists = await propertyRepository.findOneBy({id: propertyId})
    if(!propertyAlreadyExists){
        throw new AppError(404, "Property not found")
    }

    const dateVisitAlreadyExists = await scheduleRepository.findOneBy({
        date: date, hour:hour
    })
    if(!!dateVisitAlreadyExists){
        throw new AppError(400,"User schedule already exists")
    }

    if(!(Number(hour.slice(0,2)) >= 8 && Number(hour.slice(0,2)) <= 18) || (Number(hour.slice(0,2)) === 18 && Number(hour.slice(3)) > 0)){
        throw new AppError(400,"Ivalid hour")
    }

    if(!(new Date(date).getDay() > 0 && new Date(date).getDay() < 6)){
        throw new AppError(400, "Invalid Date")
    }


    const schedule = new Schedules_users_properties()
    schedule.date = date
    schedule.hour = hour
    schedule.propertyId = property !
    schedule.user = user !

    scheduleRepository.create(schedule)
    await scheduleRepository.save(schedule)


    return "Schedule created"

}

export default createScheduleService