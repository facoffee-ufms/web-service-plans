import { CreatePlanDto, UpdatePlanDto } from './dto';
import { Plan } from './entities';

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable({})
export class PlansService {
  constructor(@InjectModel('Plan') private planModel: Model<Plan>) {}

  create(dto: CreatePlanDto) {
    const createdPlan = new this.planModel(dto);
    return createdPlan.save();
  }

  findAll() {
    return this.planModel.find().exec();
  }

  findOne(id: string) {
    return this.planModel.findById(id).exec();
  }

  update(id: string, dto: UpdatePlanDto) {
    return this.planModel.updateOne({ _id: id }, dto);
  }

  remove(id: string) {
    return this.planModel.deleteOne({ _id: id });
  }
}
