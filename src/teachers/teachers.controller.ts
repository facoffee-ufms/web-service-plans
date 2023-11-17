import { TeachersService } from './teachers.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PlansService } from '../plans/plans.service';
import { Teacher } from './entities/teacher.entity';
import { SignPlanDTO, UpdateTeacherDto } from './dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Put,
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

  @Get(':id/subscriptions')
  async findAllSubscriptions(@Param('id') id: string) {
    const teacher = await this.teacherService.findOne(id);

    if (!teacher) {
      throw new ForbiddenException(`Teacher ${id} doesn't exist`);
    }

    return await this.subscriptionService.findOne(teacher.subscriptionId);
  }
}
