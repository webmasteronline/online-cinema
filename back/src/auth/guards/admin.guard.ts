import { UserModel } from 'src/user/user.model'
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

//implements CanActivate - это обязательно нужно делать когда создаем свой quard.
//В jwt.guard.ts мы этого не делали так как:  AuthGuard уже в себе содержит - CanActivate
export class OnlyAdminGuard implements CanActivate {
	//Reflector - требования nestJs - вспомогательный класс
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		//request - то что нам приходит
		//getRequest() мы указываем дженерик тоесть тип - <{ user: UserModel }> без этого указания значение будет any
		const request = context.switchToHttp().getRequest<{ user: UserModel }>()
		const user = request.user

		//если в базе у текущего пользователя "isAdmin": false (тоесть он не админ), и мы указали @Auth('admin') в user.controller.ts
		//то этот пользователь увидет сообщение -You have no rights!! . так как эти данные мы обозначили ( @Auth('admin')) что только для админа
		if (!user.isAdmin) throw new ForbiddenException('You have no rights!!')

		return user.isAdmin
	}
}
