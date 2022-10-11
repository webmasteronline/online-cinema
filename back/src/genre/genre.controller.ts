import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CreateGenreDto } from './dto/createGenre.dto'
import { GenreService } from './genre.service'

@Controller('genres')
export class GenreController {
	constructor(private readonly GenreService: GenreService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.GenreService.bySlug(slug)
	}

	//
	@Get() // так как у нас GEt запрос  то у нас должен быть @Query() параметр пример - @Get()?searchTerm = 'тело запроса'
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.GenreService.getAll(searchTerm)
	}

	@Get('/popular')
	async getPopular() {
		return this.GenreService.getPopular()
	}
	/*
	@Get('/collections') - на этот путь мы отправляем запроссы с фронта genre.service.ts
		async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl(`/collections`))
	},
	*/
	@Get('/collections')
	async getCollections() {
		return this.GenreService.getCollections()
	}

	//получения профила пользователя по id
	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.GenreService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post() //получаем id таким образом : через параметр @Param и сразуже его валидируем IdValidationPipe - что он у нас не просто строка а именно айдишник от mongoDB
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.GenreService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id') //получаем id таким образом : через параметр @Param и сразуже его валидируем IdValidationPipe - что он у нас не просто строка а именно айдишник от mongoDB
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateGenreDto
	) {
		return this.GenreService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.GenreService.delete(id)
	}
}
