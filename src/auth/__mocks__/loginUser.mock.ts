import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dto/login.dto';

export const loginUser: LoginDto = {
  email: userEntityMock.email,
  password: '8956521554',
};
