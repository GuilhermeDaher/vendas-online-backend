import createUserDTO from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import UserEntity from './entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: createUserDTO): Promise<UserEntity> {
    const passwordHashed = await hash(createUserDto.password, 10);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserByIdUsingReferences(user_id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: user_id },
      relations: ['addresses'],
    });
  }

  async findUserById(user_id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new NotFoundException(`UserId: ${user_id} was not found`);
    }
    return user;
  }
}
