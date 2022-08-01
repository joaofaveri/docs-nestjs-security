import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './../users/users.service';
import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(login: ValidateUserDto): Promise<User | null> {
    const user = await this.usersService.findOne({
      username: login.username,
    });

    if (user && user.password === login.password) {
      return user;
    }

    return null;
  }
}
