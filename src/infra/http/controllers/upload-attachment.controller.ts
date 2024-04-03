import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/attachments/:slug')
export class UploadAttachmentController {
  // constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(@UploadedFile() file: Express.Multer.File) {}
}
