import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import AppDataSource from "../data-source";
import { Users } from "../entities/user.entity";

const isAdmVerify = async (req:Request, res:Response, next:NextFunction) => {
    const {userEmail} = req

    const userRepository = AppDataSource.getRepository(Users)
    const userIsAdm = await userRepository.findOneBy({email: userEmail})

    if(!userIsAdm?.isAdm){
        
        return res.status(403).json({
        message: "User is not admin"
        })
    }

    next()
}

export default isAdmVerify