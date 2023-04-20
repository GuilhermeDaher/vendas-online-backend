import { userEntityMock } from "../../user/__mocks__/user.mock";
import AddressEntity from "../entities/address.entity";
import { cityMock } from "../../city/__mocks__/city.mock";

export const addressMock: AddressEntity = {
cep: '21234434',
city_id: cityMock.id,
complement: 'teste',
created_at: new Date(),
id: 3,
number: 33,
updated_at: new Date(),
user_id: userEntityMock.id
}