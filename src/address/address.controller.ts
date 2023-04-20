import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import AddressEntity from './entities/address.entity';
import { UserType } from 'src/user/enum/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/userId.decorator';

@Roles( UserType.User)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() user_id: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, user_id);
  }
}
