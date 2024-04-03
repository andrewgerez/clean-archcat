import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/attachments/:slug')
export class UploadAttachmentController {
  // constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 1024 * 1024 * 2 // 2MB
        }),
        new FileTypeValidator({
          fileType: 'image/jpeg'
        }),
      ],
    }),
  ) file: Express.Multer.File) {
    console.log(file)
  }
}
