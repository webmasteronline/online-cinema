import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  //пайпсы - для волидации входных данных
  //,,,
  //@Post('register')это наш путь в url /auth/register  /auth - так как мы внутри - @Controller('auth')
  @Post('register')
  async register(@Body() dto: any) {
    return this.AuthService.register(dto)
  }
}
