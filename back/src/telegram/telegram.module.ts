import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
	providers: [TelegramService],
//экспортируем наш сервис так как мы будем использовать на сервис и в других сервисах тоже
	exports: [TelegramService]
})
export class TelegramModule {}
