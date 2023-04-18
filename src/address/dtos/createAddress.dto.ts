import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  complement: string;

  @IsInt()
  number: number;

  @IsString()
  cep: string;

  @IsInt()
  city_id: number;
}
