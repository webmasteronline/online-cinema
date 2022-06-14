import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

//extends TimeStamp - для того что бы каждый раз самим не прописывать в модели поля которые создаются автоматом в базе данных - например - _id: string и createdAt: string

export interface GenreModel extends Base {}
export class GenreModel extends TimeStamps {

	@prop()
	name: string

	@prop({unique: true})
	slug: string

	@prop()
	description: string

	@prop()
	icon: string
}
