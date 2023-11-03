import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  durationDays: number;

  @Prop()
  items: [
    {
      name: string;
      count: number;
    },
  ];
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
