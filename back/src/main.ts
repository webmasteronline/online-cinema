import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors() //нужно для деплоя кода отправляем запрос с 3000 на сервер 4200
	await app.listen(4200)
}
bootstrap()
