import { IsNotEmpty, IsString } from 'class-validator';

export interface PlanHistory {
  planId: string;
  planName: string;
  updatedAt: Date;
}

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  createdAt: Date;

  @IsNotEmpty()
  firstPlan: PlanHistory;
}

export class UpdateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  updatedAt: Date;

  @IsNotEmpty()
  newPlan: PlanHistory;
}
