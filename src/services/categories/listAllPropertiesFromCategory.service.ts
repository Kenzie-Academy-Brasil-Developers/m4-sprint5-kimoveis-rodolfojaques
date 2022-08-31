import AppDataSource from "../../data-source"
import { Categories } from "../../entities/category.entity"
import { Properties } from "../../entities/properties.entity"
import { AppError } from "../../error/appError"

const listAllPropertiesFromCategoryService = async (id:string) => {
    const categoryRepository = AppDataSource.getRepository(Categories)
    const propertyRepository = AppDataSource.getRepository(Properties)
    const allProperties = await propertyRepository.find()

    const category = await categoryRepository.findOneBy({id:id})
    if(!category){
        throw new AppError(404, "Category not found")
    }

    const propertiesFromCategory = await allProperties.filter(prop => prop.categoryId?.id === category.id)


    const returnObj = {
        ...category,
        properties: propertiesFromCategory
    }

    return returnObj
} 

export default listAllPropertiesFromCategoryService