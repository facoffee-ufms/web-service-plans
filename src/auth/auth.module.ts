import { AuthGuard } from './auth.guard';

import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthGuard],
})
export class AuthModule {}
