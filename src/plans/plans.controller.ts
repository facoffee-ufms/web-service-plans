import { PlansService } from './plans.service';
import { AuthGuard } from '../auth/auth.guard';
import { Plan } from './entities';
import { CreatePlanDto, UpdatePlanDto } from './dto';
import { DeletedPlanResponse } from './responses';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @ApiOperation({ summary: 'Create plan' })
  @ApiResponse({
    status: 201,
    description: 'The created plan',
    type: Plan,
  })
  @Post()
  create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto);
  }

  @ApiOperation({ summary: 'Find all plans' })
  @ApiResponse({
    status: 200,
    description: 'All plans',
    type: [Plan],
  })
  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @ApiOperation({ summary: 'Find plan' })
  @ApiResponse({
    status: 200,
    description: 'The found plan',
    type: Plan,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @ApiOperation({ summary: 'Update plan' })
  @ApiResponse({
    status: 200,
    description: 'The updated plan',
    type: Plan,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    return this.plansService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete plan' })
  @ApiResponse({
    status: 200,
    description: 'The deleted plan result',
    type: DeletedPlanResponse,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}
