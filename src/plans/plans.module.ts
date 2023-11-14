import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PlanSchema } from './entities';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Plan', schema: PlanSchema }])],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
