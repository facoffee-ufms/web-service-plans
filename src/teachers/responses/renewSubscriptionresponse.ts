import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RenewSubscriptionResponse {
  @ApiProperty()
  @IsNotEmpty()
  today: Date;

  @ApiProperty()
  @IsNotEmpty()
  remainingDays: number;
}
