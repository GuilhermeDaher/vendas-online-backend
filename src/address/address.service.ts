import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AddressEntity from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) { }

  async createAddress(
    createAddressDto: CreateAddressDto,
    user_id: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(user_id);
    await this.cityService.findCityById(createAddressDto.city_id);

    return this.addressRepository.save({
      ...createAddressDto,
      user_id,
    });
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addresses = await this.addressRepository.find({
      where: {
        id: userId,
      },
      relations: {
        city: {
          state: true
        },
      }
    })

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException(`Address not found for userId: ${userId}`);
    }

    return addresses
  }

}
