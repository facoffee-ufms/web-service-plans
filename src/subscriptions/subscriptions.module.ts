import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionSchema } from './entities';

import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
  ],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
