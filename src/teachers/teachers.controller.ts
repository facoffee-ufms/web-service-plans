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

    this.subscriptionService.create({
      createdAt: new Date().toISOString(),
      firstPlan: {
        planId: plan.id,
        planName: plan.name,
      },
    });

    return await this.teacherService.signPlan(dto);
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
      const result = await this.subscriptionService.update(
        teacher.subscriptionId,
        {
          updatedAt: new Date().toISOString(),
          newPlan: { planId: newPlan.id, planName: newPlan.name },
        },
      );

      console.log(result);
    }

    return await this.teacherService.update(id, dto);
  }
}
