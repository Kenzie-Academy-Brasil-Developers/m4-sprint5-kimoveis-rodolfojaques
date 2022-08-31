import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"

const listUsersService = async () => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()
    return users

}

export default listUsersService