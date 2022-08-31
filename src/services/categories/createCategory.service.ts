import AppDataSource from "../../data-source"
import { Categories } from "../../entities/category.entity"
import { AppError } from "../../error/appError"
import { ICategoryRequest } from "../../interfaces/categories"

const createCategoryService = async ({name}:ICategoryRequest) => {
    const categoryRepository = AppDataSource.getRepository(Categories)

    const categoryAlreadyExists = await categoryRepository.findOneBy({
        name: name
    })
    if(!!categoryAlreadyExists){
        throw new AppError(400,"Category already exists")
    }

    const category = new Categories()
    category.name = name

    categoryRepository.create(category)
    await categoryRepository.save(category)

    return category
}

export default createCategoryService