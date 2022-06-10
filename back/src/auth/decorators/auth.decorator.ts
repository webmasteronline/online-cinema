/**
 * свой декоратор @Auth() если нам нужен admin права мы просто указываем @Auth('admin'). если так @Auth() - то это должен быть просто авторизованный пользователь
 * если не казываем то для всех .
 * Здесь мы это реализуем
 */
import { OnlyAdminGuard } from '../guards/admin.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { TypeRole } from '../auth.interface'

//applyDecorators - объеденяет декораторы
//TypeRole = 'user' - по дефолту будет user
export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: UseGuards(JwtAuthGuard)
	)
