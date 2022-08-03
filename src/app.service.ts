import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! Server running on port ${process.env.PORT}`;
  }
}
