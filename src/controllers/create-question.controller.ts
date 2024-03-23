import {
  Controller, Post
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/questions')
export class CreateQuestionContorller {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Post()
  async handle() {}
}
