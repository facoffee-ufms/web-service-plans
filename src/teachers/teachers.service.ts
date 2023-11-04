import { Injectable } from '@nestjs/common';
import { SignPlanDTO } from './dto/signPlan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './entities/teacher.entity';

@Injectable({})
export class TeachersService {
  constructor(@InjectModel('Teacher') private teacherModel: Model<Teacher>) {}

  signPlan(dto: SignPlanDTO) {
    return this.teacherModel.create(dto);
  }
}
