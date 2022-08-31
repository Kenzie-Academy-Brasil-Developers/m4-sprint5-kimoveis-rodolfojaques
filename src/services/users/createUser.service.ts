import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { IUser, IUserRequest } from "../../interfaces/users";

const createUserService = async ({ name,email,password,isAdm }:IUserRequest): Promise<IUser> => {

    const userRepository = AppDataSource.getRepository(Users)

    const emailAlreadyExists = await userRepository.findOneBy({email: email})

    if(!!emailAlreadyExists){
        throw new AppError(400,"User already exists")
    }

    const passwordHashed = await hash(password,10)

    const user = new Users()
    user.name = name
    user.email = email
    user.password = passwordHashed
    user.isAdm = isAdm

    userRepository.create(user)
    await userRepository.save(user) 

    return user
}

export default createUserService