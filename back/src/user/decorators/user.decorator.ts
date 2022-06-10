import { UserModel } from 'src/user/user.model'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

type TypeData = keyof UserModel

export const User = createParamDecorator(
	(data: TypeData, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
//data: TypeData сделали для удобства получения данных чтбы получит конкретное поле конкретного юзера а не все данные
//что бы не пришлось писать вот так @User user:UserModel
//а вот так ставим дикоратор @User('_id') и пишем в него просто '_id' и могли просто получить _id:string и у нас есть АЙдишник

//type TypeData = keyof UserModel получение всех ключей
// @prop({ unique: true })
// email: string - вот ключ

// @prop()
// password: string вот ключ

// @prop({ default: false })
// isAdmin?: boolean вот ключ

// @prop({ default: [] })
// favorites?: [] вот ключ
//помимо этих так же имеем доступ к ключам которые база создает например _id

//САМЫЙ СОК здесь )
//user.controller.ts
//async getProfile(@User('_id') _id: string) - @User('_id') - прекрасно работают все подсказки ко всем нашим ключам этого user
//@user('') выпадающий список ключей - _id , email , favorites, id, isAdmin, password, то что база создала тоже есть доступ createAt, updateAt
