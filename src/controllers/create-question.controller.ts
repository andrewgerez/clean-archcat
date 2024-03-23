import {
  Controller, Post, UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionContorller {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Post()
  async handle() {}
}
