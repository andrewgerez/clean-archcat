import { OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

export class RedisService extends Redis implements OnModuleDestroy {
  constructor() {
    super({
      host: '127.0.0.1',
      port: 6379,
      db: 0,
    })
  }

  onModuleDestroy() {
    return this.disconnect()
  }
}
