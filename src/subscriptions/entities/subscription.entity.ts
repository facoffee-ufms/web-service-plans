import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
  @Prop()
  createdAt: Date;

  @Prop()
  renew: boolean;

  @Prop()
  updatedAt: Date;

  @Prop()
  plans: [
    {
      planId: string;
      planName: string;
      updatedAt: Date;
    },
  ];
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
