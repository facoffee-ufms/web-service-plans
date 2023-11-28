import { AuthGuard } from './auth.guard';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({ imports: [HttpModule], providers: [AuthGuard] })
export class AuthModule {}
