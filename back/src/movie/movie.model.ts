import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from 'src/actor/actor.model'
import { GenreModel } from 'src/genre/genre.model'

//extends TimeStamp - для того что бы каждый раз самим не прописывать в модели поля которые создаются автоматом в базе данных - например - _id: string и createdAt: string

export interface MovieModel extends Base {}

export class Parameters {
	@prop()
	year: number

	@prop()
	duration: number

	@prop()
	country: string
}
export class MovieModel extends TimeStamps {
	@prop()
	poster: string
	
	@prop()
	bigPoster: string

	@prop()
	title: string

	// @prop()
	// description: string

	@prop({unique: true})
	slug: string

	@prop()
	parameters?: Parameters

	@prop({default: 4.0})
	rating?: number 

	@prop()
	videoUrl: string

	@prop({default: 0})
	countOpened?: number
	
	/** что бы к нам приходил не просто массив id из жанров а чт обы могли его раскрыть как популейт в сервисе
	 * пример - const doc = await this.MovieModel.findOne({slug}).populate('actors genres').exec()
	 *  от жанров, атеров и обращатся уже к самим полям имя слаг ...*/
	@prop({ref: () => GenreModel})
	genres: Ref<GenreModel>[]

	@prop({ref: () => ActorModel})
	actors: Ref<ActorModel>[]

	@prop({default: false})
	isSendTelegram: boolean
}
