import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createPropertyService from "../../services/properties/createProperty.service";

const createPropertyController = async (req:Request, res:Response) => {
    try {
        const {value,size,address,categoryId} = req.body
        const {district,zipCode,number,city,state} = address

        const property = await createPropertyService({value,size,address,categoryId},{district,zipCode,number,city,state})

        return res.status(201).json(instanceToPlain(property))

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default createPropertyController