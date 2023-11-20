import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class DeletedPlanResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  acknowledged: boolean;

  @ApiProperty()
  @IsNotEmpty()
  deletedCount: number;
}
