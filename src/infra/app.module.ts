import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './http/controllers/authenticate.controller'
import { CreateAccountController } from './http/controllers/create-account.controller'
import { CreateQuestionContorller } from './http/controllers/create-question.controller'
import { FetchRecentQuestionsController } from './http/controllers/fetch-recent-questions.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionContorller,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
