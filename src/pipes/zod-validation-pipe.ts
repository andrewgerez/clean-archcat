import {
  PipeTransform,
  BadRequestException
} from '@nestjs/common'
import { PipeErrorType } from 'src/enums'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: ZodSchema) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: PipeErrorType.ValidationFailed,
          statusCode: 400,
          errors: fromZodError(error),
        })
      }

      throw new BadRequestException(PipeErrorType.ValidationFailed)
    }
  }
}
