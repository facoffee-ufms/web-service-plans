import { IsNotEmpty, IsString } from 'class-validator';

export interface PlanHistory {
  planId: string;
  planName: string;
}

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @IsNotEmpty()
  plans: PlanHistory[];
}

export class UpdateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  updatedAt: string;

  @IsNotEmpty()
  plans: PlanHistory[];
}
