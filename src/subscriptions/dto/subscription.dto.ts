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
  firstPlan: PlanHistory;
}

export class UpdateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  updatedAt: string;

  @IsNotEmpty()
  newPlan: PlanHistory;
}
