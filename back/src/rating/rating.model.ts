import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'
import { UserModel } from 'src/user/user.model'

//extends TimeStamp - для того что бы каждый раз самим не прописывать в модели поля которые создаются автоматом в базе данных - например - _id: string и createdAt: string

export interface RatingModel extends Base {}
export class RatingModel extends TimeStamps {
	//userId: Ref<UserModel> здесь будет храниться ID нашего зарегистрированого юзера
		@prop({ref: () => UserModel })
		userId: Ref<UserModel>

	//movieId: Ref<MovieModel> здесь будет храниться ID нашего фильма
		@prop({ref: () => MovieModel })
		movieId: Ref<MovieModel>
		
		@prop()
		value: number
	}

