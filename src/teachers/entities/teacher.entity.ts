import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PlanDocument = HydratedDocument<Teacher>; 
@Schema()
export class Teacher extends Document{

    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    cpf: string    
    
    @Prop()
    plan: string
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher)
