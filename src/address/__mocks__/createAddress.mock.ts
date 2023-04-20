import { cityMock } from "../../city/__mocks__/city.mock";
import { addressMock } from "./Address.mock";
import { CreateAddressDto } from "../dtos/createAddress.dto";

export const createAddressMock: CreateAddressDto = {
    cep: '33434343',
    city_id: cityMock.id,
    complement: 'testetete',
    number: addressMock.number
}