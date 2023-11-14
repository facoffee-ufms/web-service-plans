import { Injectable } from '@nestjs/common';
import { SignPlanDTO } from './dto/signPlan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Teacher } from './entities/teacher.entity';
import { UpdateTeacherDto } from './dto';

@Injectable({})
export class TeachersService {
  constructor(@InjectModel('Teacher') private teacherModel: Model<Teacher>) {}

  signPlan(dto: SignPlanDTO) {
    const subscriptionId = new Types.ObjectId();
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
