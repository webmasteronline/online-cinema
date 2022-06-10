import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common'
import { Types } from 'mongoose'

export class IdValidationPipe implements PipeTransform {
	transform(value: string, meta: ArgumentMetadata) {
		if (meta.type !== 'param') return value // валидируем именно param так как нам нуден парам @Put(':id') - user.controller.ts

		if (!Types.ObjectId.isValid(value))
			throw new BadRequestException('Invalid format id')

		return value
	}
}
