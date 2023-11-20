import { TeachersService } from './teachers.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PlansService } from '../plans/plans.service';
import { Teacher } from './entities/teacher.entity';
import { SignPlanDTO, UpdateTeacherDto } from './dto';
import { Subscription } from '../subscriptions/entities';
import { RenewSubscriptionResponse } from './responses';
import { differenceInDays } from './utils';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(
    private teacherService: TeachersService,
    private subscriptionService: SubscriptionsService,
    private planService: PlansService,
  ) {}

  @Put()
  @ApiOperation({ summary: 'Sign teacher' })
  @ApiResponse({
    status: 201,
    description: 'The signed teacher',
    type: Teacher,
  })
  async signPlan(@Body() dto: SignPlanDTO) {
    const plan = await this.planService.findOne(dto.planId);

    if (!plan) {
      throw new ForbiddenException(`Plan ${dto.planId} doesn't exist`);
    }

    const subscription = await this.subscriptionService.create({
      createdAt: new Date(),
      firstPlan: {
        planId: plan.id,
        planName: plan.name,
        updatedAt: new Date(),
      },
    });

    return await this.teacherService.signPlan(subscription.id, dto);
  }

  @ApiOperation({ summary: 'Update teacher' })
  @ApiResponse({
    status: 200,
    description: 'The updated teacher',
    type: Teacher,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    const teacher = await this.teacherService.findOne(id);
    const newPlan = await this.planService.findOne(dto.planId);

    if (!teacher) {
      throw new ForbiddenException(`Teacher ${id} doesn't exist`);
    }

    if (!newPlan) {
      throw new ForbiddenException(`Plan ${dto.planId} doesn't exist`);
    }

    if (dto.planId != teacher.planId) {
      await this.subscriptionService.update(teacher.subscriptionId, {
        updatedAt: new Date(),
        newPlan: {
          planId: newPlan.id,
          planName: newPlan.name,
          updatedAt: new Date(),
        },
      });
    }

    return await this.teacherService.update(id, dto);
  }

  @ApiOperation({ summary: 'Find Subscriptions of Teacher' })
  @ApiResponse({
    status: 200,
    description: 'All subscriptions from teacher',
    type: Subscription,
  })
  @Get(':id/subscriptions')
  async findAllSubscriptions(@Param('id') id: string) {
    const teacher = await this.teacherService.findOne(id);

    if (!teacher) {
      throw new ForbiddenException(`Teacher ${id} doesn't exist`);
    }

    return await this.subscriptionService.findOne(teacher.subscriptionId);
  }

  @ApiOperation({ summary: 'Renew Teacher Subscription' })
  @ApiResponse({
    status: 200,
    description: 'Subscription new state',
    type: RenewSubscriptionResponse,
  })
  @Patch(':id/subscriptions')
  async renewPlan(@Param('id') id: string, @Query('renew') renew: string) {
    const renewBool = renew === 'true' ? true : false;
    const teacher = await this.teacherService.findOne(id);

    if (!teacher) {
      throw new ForbiddenException(`Teacher ${id} doesn't exist`);
    }

    this.subscriptionService.renewPlan(teacher.subscriptionId, renewBool);

    const today = new Date();
    const plan = await this.planService.findOne(teacher.planId);

    if (renewBool) {
      await this.subscriptionService.renewPlan(teacher.subscriptionId, true);
      return { today, remainingDays: plan.durationDays };
    } else {
      const subscription = await this.subscriptionService.findOne(
        teacher.subscriptionId,
      );

      return {
        today,
        remainingDays:
          plan.durationDays - differenceInDays(subscription.updatedAt, today),
      };
    }
  }
}
