import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: username,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const hashedData = { ...data, password: hashedPassword };
    return this.prisma.user.create({
      data: hashedData,
    });
  }
}
