import { Injectable } from '@nestjs/common';
import { SignPlanDTO } from './dto/signPlan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './entities/teacher.entity';
import { UpdateTeacherDto } from './dto';

@Injectable({})
export class TeachersService {
  constructor(@InjectModel('Teacher') private teacherModel: Model<Teacher>) {}

  signPlan(subscriptionId: string, dto: SignPlanDTO) {
    return this.teacherModel.create({ ...dto, subscriptionId });
  }

  findAll() {
    return this.teacherModel.find().exec();
  }

  findOne(id: string) {
    return this.teacherModel.findById(id).exec();
  }

  update(id: string, dto: UpdateTeacherDto) {
    return this.teacherModel.updateOne({ _id: id }, dto);
  }
}
