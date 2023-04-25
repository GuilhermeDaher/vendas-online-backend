import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginUser } from '../__mocks__/loginUser.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(jwtMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user and email valid', async () => {
    const user = await service.login(loginUser);
    expect(user).toEqual({
      access_token: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });

    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user and email invalid', async () => {
    expect(
      service.login({
        ...loginUser,
        password: '23343',
      }),
    ).rejects.toThrowError();
  });

  it('should return email not exist ', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);
    expect(service.login(loginUser)).rejects.toThrowError();
  });

  it('should return error in userService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());
    expect(service.login(loginUser)).rejects.toThrowError();
  });
});
