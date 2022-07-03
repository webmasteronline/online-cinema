import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { ActorDto } from './actor.dto';
import { ActorService } from './actor.service';

@Controller('actors')
export class ActorController {
	constructor(private readonly ActorService: ActorService){	}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug:string){
		return this.ActorService.bySlug(slug)
	}

	@Get() // так как у нас GEt запрос  то у нас должен быть @Query() параметр пример - @Get()?searchTerm = 'тело запроса'
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.ActorService.getAll(searchTerm)
	}

	//получения профила пользователя по id
	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.ActorService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post() //получаем id таким образом : через параметр @Param и сразуже его валидируем IdValidationPipe - что он у нас не просто строка а именно айдишник от mongoDB
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.ActorService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id') //получаем id таким образом : через параметр @Param и сразуже его валидируем IdValidationPipe - что он у нас не просто строка а именно айдишник от mongoDB
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ActorDto
	) {
		return this.ActorService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.ActorService.delete(id)
	}
}
