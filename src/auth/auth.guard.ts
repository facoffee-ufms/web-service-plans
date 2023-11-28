import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.decode(token);

    await this.validateWithServer(token);

    request['roles'] = payload.realm_access.roles;
    request['email'] = payload.email;
    request['sub'] = payload.sub;

    return true;
  }

  async validateWithServer(token: string) {
    const config = {
      method: 'get',
      url: `${process.env.KC_BASE_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/userinfo`,
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await firstValueFrom(
      this.httpService.request(config).pipe(
        catchError(() => {
          throw new UnauthorizedException();
        }),
      ),
    );

    return data;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
