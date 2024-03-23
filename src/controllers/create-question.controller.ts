import {
  Controller, Post, UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionContorller {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Post()
  async handle() {}
}
