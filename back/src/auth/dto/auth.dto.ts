import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string
	//MinLength - ограничение по количеству символов 
	//message - будет приходить на front в виде массива.
	@MinLength(6,{
		message: 'Password can`t be less than 6 characters! ',
	})
	@IsString()
	password: string
}