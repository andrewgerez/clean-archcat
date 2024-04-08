import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentsRepository } from '../repositories/attachments-repository'

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository
  ) {}

  async execute({
    fileName,
    fileType,
    body
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    const mimetypeRegex = /^(image\/jpeg|image\/png|image\/jpg|application\/pdf)$/;
    const isValidMimetype = mimetypeRegex.test(fileType);

    if (!isValidMimetype) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const attachment = Attachment.create({
      title: fileName,
      url: fileName,
    })

    await this.attachmentsRepository.create(attachment)

    return right({
      attachment,
    })
  }
}
