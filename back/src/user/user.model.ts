import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

//extends TimeStamp - для того что бы каждый раз самим не прописывать в модели поля которые создаются автоматом в базе данных - например - _id: string и createdAt: string

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop()
	password: string

	@prop({ default: false })
	isAdmin?: boolean

	@prop({ default: [] })
	favorites?: []
}
