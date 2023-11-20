import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
  @ApiProperty({
    example: '2023-11-17T23:39:13.002Z',
    description: 'The created date of the Subscription',
  })
  @Prop()
  createdAt: Date;

  @ApiProperty({
    example: true,
    description: 'The Subscription renewal state',
  })
  @Prop()
  renew: boolean;

  @ApiProperty({
    example: '2023-11-17T23:39:13.002Z',
    description: 'The updated date of the Subscription',
  })
  @Prop()
  updatedAt: Date;

  @ApiProperty({
    example: [
      {
        planId: 'XXXXXXXXXXXXXXXXX',
        planName: 'basic',
        updatedAt: '2023-11-17T23:39:13.002Z',
      },
    ],
    description: 'The updated date of the Subscription',
  })
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
