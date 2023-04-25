import UserEntity from '../entities/user.entity';
import { UserType } from '../enum/userType.enum';

export const userEntityMock: UserEntity = {
  cpf: '12345678912',
  created_at: new Date(),
  email: 'guilhermedaher63@gmail.com',
  id: 1,
  name: 'nomeMock',
  phone: '21990533425',
  password: '$2b$10$5PzE.nJgWvk9mbleKaOM1./yVT38C2NH8vjyRWevXfXJM.whgrpAO',
  typeUser: UserType.User,
  updated_at: new Date(),
  addresses: [],
};
