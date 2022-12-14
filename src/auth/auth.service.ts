import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from './../users/users.service';
import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: ValidateUserDto): Promise<User | null> {
    const user = await this.usersService.findOne({
      username: login.username,
    });

    const isMatchPassword = await bcrypt.compare(login.password, user.password);

    if (user && isMatchPassword) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
      }),
    };
  }

  async loginGoogle(request) {
    if (!request.user) {
      return {
        message: 'No user from Google',
      };
    }
    return {
      message: 'User information from Google',
      info: request.user,
    };
  }
}
