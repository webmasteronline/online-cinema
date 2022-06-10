import { IsEmail, IsString } from 'class-validator'
export class UpdateUserDto {
	@IsEmail()
	email: string

	password?: string

	//	@IsBoolean не пишем так как этот параметр не обязательный - ?:  , а прога будет ругаться что мы не передали этот параметр, а нам нужно сделать что бы это dto была для всех и для Админ и для обычного пользователя
	isAdmin?: boolean
}
