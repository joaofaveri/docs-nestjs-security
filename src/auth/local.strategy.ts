import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUserDto } from './dto/validate-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User | Error> {
    const login: ValidateUserDto = {
      username,
      password,
    };
    const user = await this.authService.validateUser(login);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
