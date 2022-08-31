import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../error/appError"

const deleteUserService = async (id:string) => {
    const userRepository = AppDataSource.getRepository(Users)

    const account = await userRepository.findOneBy({id: id})

    if(!account){
        throw new AppError(404,"User not found")
    }

    if(account.isActive === false){
        throw new AppError(400, "Inactive user")
    }

    await userRepository.update(account.id, {isActive:false})

    return account
}

export default deleteUserService