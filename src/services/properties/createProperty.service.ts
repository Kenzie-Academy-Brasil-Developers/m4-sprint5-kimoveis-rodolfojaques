import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/category.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../error/appError";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({value,size,address,categoryId}:IPropertyRequest,{district,zipCode,number,city,state}:IAddressRequest) => {
    const propertyRepository = AppDataSource.getRepository(Properties)
    const addressRepository = AppDataSource.getRepository(Addresses)
    const categoryRepository = AppDataSource.getRepository(Categories)


    if(state.length > 2){
        throw new AppError(400,"Invalid state")
    }

    if(zipCode.length > 8){
        throw new AppError(400,"Invalid zip code")
    }

    const category = await categoryRepository.findOneBy({id: categoryId})
    if(!category){
        throw new AppError(404, "Category not found")
    }

    const addressAlreadyRegistred = await addressRepository.findOneBy({district:district, number:number, city:city, state:state})
    if(!!addressAlreadyRegistred){
        throw new AppError(400,"Address already exists")
    }

    const newAddress = new Addresses()
    newAddress.city = city
    newAddress.district = district
    newAddress.number = number !
    newAddress.state = state
    newAddress.zipCode = zipCode

    addressRepository.create(newAddress)
    await addressRepository.save(newAddress)



    const property = new Properties()
    property.value = value
    property.size = size
    property.address = newAddress    
    if(!!category){
        property.categoryId = category
    }

    propertyRepository.create(property)
    await propertyRepository.save(property)

    return property
}

export default createPropertyService