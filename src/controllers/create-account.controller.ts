import { Controller, Post, HttpCode, Body, ConflictException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type createAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(
    private prisma: PrismaService
  ) { }

  @Post()
  @HttpCode(201)
  async handle(@Body() body: createAccountBodySchema) {
    const { name, email, password } = createAccountBodySchema.parse(body)

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.'
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })
  }
}
