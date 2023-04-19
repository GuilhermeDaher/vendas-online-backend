import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CityEntity from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
      this.cityRepository.find({
        where: {
          state_id: stateId,
        },
      }),
    );
  }

  async findCityById(city_id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id: city_id,
      },
    });

    if (!city) {
      throw new NotFoundException(`city_id: ${city_id} was not found`);
    }

    return city;
  }
}
