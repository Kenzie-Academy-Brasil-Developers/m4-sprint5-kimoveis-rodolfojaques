import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listPropertiesService from "../../services/properties/listProperties.service";

const listPropertiesController = async (req:Request, res: Response) => {
    const properties = await listPropertiesService()

    return res.json(instanceToPlain(properties))
}

export default listPropertiesController