import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth.guard'
import { EnvService } from '../env.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule { }
