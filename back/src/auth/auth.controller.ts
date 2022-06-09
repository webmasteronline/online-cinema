import { RefreshTokenDto } from './dto/refreshToken.dto'
import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}

	//пайпсы - для волидации входных данных
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.AuthService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	//getNewTokens принимает Bady а в бади лежит RefreshTokenDto который содержит refreshToken: string - это то что мы указываем в Bady в insomnia
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.AuthService.getNewTokens(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	//@Post('register')это наш путь в url /auth/register  /auth - так как мы внутри - @Controller('auth')
	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.AuthService.register(dto)
	}
}
