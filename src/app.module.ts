import { AuthModule } from './auth/auth.module';
import { PlansModule } from './plans/plans.module';
import { TeachersModule } from './teachers/teachers.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    PlansModule,
    TeachersModule,
    SubscriptionsModule,
  ],
})
export class AppModule {}
