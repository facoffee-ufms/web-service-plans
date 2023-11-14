import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto';
import { Subscription } from './entities';

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable({})
export class SubscriptionsService {
  constructor(
    @InjectModel('Subscription') private subscriptionModel: Model<Subscription>,
  ) {}

  create(dto: CreateSubscriptionDto) {
    const createdPlan = new this.subscriptionModel(dto);
    return createdPlan.save();
  }

  findAll() {
    return this.subscriptionModel.find().exec();
  }

  findOne(id: string) {
    return this.subscriptionModel.findById(id).exec();
  }

  update(id: string, dto: UpdateSubscriptionDto) {
    return this.subscriptionModel.updateOne({ _id: id }, dto);
  }

  remove(id: string) {
    return this.subscriptionModel.deleteOne({ _id: id });
  }
}
