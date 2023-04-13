import { Injectable } from '@nestjs/common';
import createUserDTO from './dtos/createUser.dto';
import User from './interfaces/user.interface';
import {hash} from 'bcrypt'

@Injectable()
export class UserService {
    private users: User[] = []

    async createUser(createUserDto: createUserDTO): Promise<User> {

        const passwordHashed = await hash(createUserDto.password, 10)

        const user = {
            ...createUserDto,
            id: this.users.length + 1,
            password: passwordHashed
        }

        this.users.push(user)

        return user
    }

    async getAllUser(): Promise<User[]>{
        return this.users
    }

}
