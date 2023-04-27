import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import AddressEntity from './entities/address.entity';
import { UserType } from '../user/enum/userType.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/userId.decorator';
import { returnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() user_id: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, user_id);
  }

  @Get()
  async findAddressByUserId(
    @UserId() user_id: number,
  ): Promise<returnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(user_id)).map(
      (address) => new returnAddressDto(address),
    );
  }
}
