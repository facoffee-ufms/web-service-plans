import { Body, Controller, Put } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { SignPlanDTO } from './dto/signPlan.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  @Put()
  async signPlan(@Body() dto: SignPlanDTO) {
    return await this.teacherService.signPlan(dto);
  }
}
