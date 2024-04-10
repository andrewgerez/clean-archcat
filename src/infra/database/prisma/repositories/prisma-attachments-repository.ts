import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    await this.prisma.attachment.create({
      data: {
        title: attachment.title,
        url: attachment.url,
      },
    })
  }
}
