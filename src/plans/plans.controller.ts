import { PlansService } from './plans.service';
import { Plan } from './entities';
import { CreatePlanDto, UpdatePlanDto } from './dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    return this.plansService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete plan' })
  @ApiResponse({
    status: 200,
    description: 'The deleted plan',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}
