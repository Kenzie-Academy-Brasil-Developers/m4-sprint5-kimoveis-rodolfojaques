import bcrypt from "bcrypt";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken"

require("dotenv").config()

const loginUserService = async ({email, password}:IUserLogin) => {
    const userRepository = AppDataSource.getRepository(Users)

    const account = await userRepository.findOneBy({email: email})

    if(!account){
        throw new AppError(403, "Invalid credentials")
    }

    if(!bcrypt.compareSync(password, account.password)){
        throw new AppError(403, "Invalid credentials")
    }

    if(account.isActive === false){
        throw new AppError(400, "User is not active")
    }

    const token = jwt.sign({
        email: account.email
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: "24h",
        subject: account.id
    })

    return token
}

export default loginUserService