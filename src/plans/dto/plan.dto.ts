import { IsNotEmpty, IsString } from 'class-validator';

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

export interface Items {
  name: string;
  count: number;
}
