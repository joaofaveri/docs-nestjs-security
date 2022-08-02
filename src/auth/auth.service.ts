import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './../users/users.service';
import { ValidateUserDto } from './dto/validate-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
