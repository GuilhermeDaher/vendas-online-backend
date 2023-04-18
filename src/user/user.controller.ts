import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import createUserDTO from './dtos/createUser.dto';
import User from './entities/user.entity';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import UserEntity from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: createUserDTO) {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (UserEntity) => new ReturnUserDto(UserEntity),
    );
  }
}
