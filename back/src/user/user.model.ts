import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'

//extends TimeStamp - для того что бы каждый раз самим не прописывать в модели поля которые создаются автоматом в базе данных - например - _id: string и createdAt: string

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop()
	password: string

	@prop({ default: false })
	isAdmin?: boolean

//Ref<MovieModel>[] здесь будут храниться ID наших фильмов 
	@prop({ default: [], ref: () => MovieModel })
	favorites?: Ref<MovieModel>[]
}
