import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PlanDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher extends Document {
  @ApiProperty({ example: 'Pedro', description: 'The name of the teacher' })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'pedro@hotmail.com',
    description: 'The email of the teacher',
  })
  @Prop()
  email: string;

  @ApiProperty({
    example: '123.123.123-12',
    description: 'The CPF of the teacher',
  })
  @Prop()
  cpf: string;

  @ApiProperty({
    example: '6553df3eb85ee5b592838b30',
    description: 'The planId of the teacher',
  })
  @Prop()
  planId: string;

  @ApiProperty({
    example: '6553df3eb85ee5b592838b30',
    description:
      'The subscriptionId for the history of the teacher previous subscriptions',
  })
  @Prop()
  subscriptionId: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
