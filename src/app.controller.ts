import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private prisma: PrismaService
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('/prisma')
  connection() {
    return this.prisma.user.findMany()
  }
}
