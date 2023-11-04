import { IsNotEmpty, IsString } from 'class-validator';

export interface Items {
  name: string;
  count: number;
}

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  durationDays: number;

  @IsNotEmpty()
  items: Items[];
}

export class UpdatePlanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  durationDays: number;

  @IsNotEmpty()
  items: Items[];
}
