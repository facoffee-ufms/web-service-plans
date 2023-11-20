import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Items {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  count: number;
}

export class CreatePlanDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  durationDays: number;

  @ApiProperty({ type: [Items] })
  @IsArray()
  @IsNotEmpty()
  items: Items[];
}

export class UpdatePlanDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  durationDays: number;

  @ApiProperty({ type: [Items] })
  @IsArray()
  @IsNotEmpty()
  items: Items[];
}
