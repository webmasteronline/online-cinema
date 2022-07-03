import { IsArray, IsBoolean, IsNumber, IsObject, IsString } from 'class-validator'

export class Parameters {
	@IsNumber()
	year: number

	@IsNumber()
	duration: number

	@IsString()
	country: string
}

export class UpdateMovieDto {
	@IsString()
	poster: string
	
	@IsString()
	bigPoster: string

	@IsString()
	title: string

	// @IsString()
	// description: string

	@IsString()
	slug: string

	@IsObject()
	parameters?: Parameters

	@IsString()
	videoUrl: string

	/** что бы к нам приходил не просто массив id из жанров а чт обы могли его раскрыть как популейт от жанров и обращатся уже к самим полям имя слаг ... мы делаем здесь @IsString({each: true}) genres: string[] . А в movie.model.js делаем референсы @prop({ref: () => GenreModel}) genres: Ref<GenreModel>[]*/
	@IsArray()
	@IsString({each: true})
	genres: string[]

	@IsArray()
	@IsString({each: true})
	actors: string[]

	isSendTelegram?: boolean

}