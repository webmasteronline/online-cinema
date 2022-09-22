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
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { UpdateUserDto } from 'src/user/dto/updateUser.dto'
import { MovieService } from './movie.service'
import { UpdateMovieDto } from './dto/updateMovie.dto'
import { GenreIdsDto } from './dto/genreIds.dto'

@Controller('movies')
export class MovieController {
	constructor(private readonly MovieService: MovieService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.MovieService.bySlug(slug)
	}

	//IdValidationPipe сразуже проверяем валиден ли наш id
	@Get('by-actor/:actorId')
	async byActor(@Param('actorId', IdValidationPipe) actorId: Types.ObjectId) {
		return this.MovieService.byActor(actorId)
	}

	//@Post хоть мы и не будет тут что либо создавть но так будет удобне передать массив в теле body
	// потому что в куэри параметрах это не удобно делать
	@UsePipes(new ValidationPipe())
	@Post('by-genres')
	@HttpCode(200)
	async byGenres(@Body() { genreIds }: GenreIdsDto) {
		return this.MovieService.byGenres(genreIds)
	}

	@Get() // так как у нас GEt запрос  то у нас должен быть @Query() параметр пример - @Get()?searchTerm = 'тело запроса'
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.MovieService.getAll(searchTerm)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.MovieService.getMostPopular()
	}

	@Put('update-count-opened')
	@HttpCode(200)
	async updateCountOpened(@Body('slug') slug: string) {
		return this.MovieService.updateCountOpened(slug)
	}

	//получения профила пользователя по id
	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.MovieService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post() //получаем id таким образом : через параметр @Param и сразуже его валидируем IdValidationPipe - что он у нас не просто строка а именно айдишник от mongoDB
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.MovieService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id') //получаем id таким образом : через параметр @Param и сразуже его валидируем IdValidationPipe - что он у нас не просто строка а именно айдишник от mongoDB
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateMovieDto
	) {
		return this.MovieService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.MovieService.delete(id)
	}
}
