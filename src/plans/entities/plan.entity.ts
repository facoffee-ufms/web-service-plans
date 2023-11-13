import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {
  @ApiProperty({ example: 'basic', description: 'The name of the Plan' })
  @Prop()
  name: string;

  @ApiProperty({ example: 20, description: 'The price of the Plan' })
  @Prop()
  price: number;

  @ApiProperty({ example: 30, description: 'The duration days of the Plan' })
  @Prop()
  durationDays: number;

  @ApiProperty({
    example: [{ name: 'coffee', count: 3 }],
    description: 'The items of the Plan',
  })
  @Prop()
  items: [
    {
      name: string;
      count: number;
    },
  ];
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
