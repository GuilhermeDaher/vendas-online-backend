import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '../Address.service';
import { addressMock } from '../__mocks__/Address.mock';
import AddressEntity from '../entities/Address.entity';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { createAddressMock } from '../__mocks__/createAddress.mock';

describe('AddressService', () => {
    let service: AddressService;
    let AddressRepository: Repository<AddressEntity>;
    let userService: UserService;
    let cityService: CityService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AddressService,
                {
                    provide: getRepositoryToken(AddressEntity),
                    useValue: {
                        save: jest.fn().mockResolvedValue(addressMock),
                        find: jest.fn().mockResolvedValue(addressMock),
                    }
                },
                {
                    provide: UserService,
                    useValue: {
                        findUserById: jest.fn().mockResolvedValue(userEntityMock),
                    }
                },
                {
                    provide: CityService,
                    useValue: {
                        findCityById: jest.fn().mockResolvedValue(cityMock),
                    }
                }
            ],
        }).compile();

        service = module.get<AddressService>(AddressService);
        userService = module.get<UserService>(UserService);
        cityService = module.get<CityService>(CityService);
        AddressRepository = module.get<Repository<AddressEntity>>(
            getRepositoryToken(AddressEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(AddressRepository).toBeDefined();
    });

    it('should return Address after save', async () => {
        const Address = await service.createAddress(createAddressMock, userEntityMock.id)

        expect(Address).toEqual(addressMock);
    });

    it('should return error if exception in user service', async () => {
        jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

        expect(service.createAddress(createAddressMock, userEntityMock.id)).rejects.toThrowError();

        const address = await service.createAddress(
            createAddressMock,
            userEntityMock.id
        );

        expect(address).toEqual(addressMock);
    });

    it('should return error if exception in city service', async () => {
        jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());

        expect(service.createAddress(createAddressMock, userEntityMock.id)).rejects.toThrowError();

    });

    it('should return all address to user', async () => {
        const addresses = await service.findAddressByUserId(userEntityMock.id);

        expect(addresses).toEqual(addressMock);
    });

    it('should return not found if not address register', async () => {
        jest.spyOn(AddressRepository, 'find').mockResolvedValue(undefined);

        expect(service.findAddressByUserId(userEntityMock.id),
        ).rejects.toThrowError();
    });
}); 