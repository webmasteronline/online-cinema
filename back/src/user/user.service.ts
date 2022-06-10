import { genSalt, hash } from 'bcryptjs'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from 'src/user/user.model'
import { InjectModel } from 'nestjs-typegoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async byId(_id: string) {
		const user = await this.UserModel.findById(_id)

		if (!user) throw new NotFoundException('User not found')

		return user
	}

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id)

		//проверяем свобед ли email вдруг он уже принадледит другому пользователю
		const isSameUser = await this.UserModel.findOne({ email: dto.email })

		//а так же проверям наш String(_id) который к нам приходит на 21 строке с юзером в базе
		//в случе если они равны то это наш юзер и обновляй без проблем но если id  не равны значит этот email занят другим пользователем
		if (isSameUser && String(_id) !== String(isSameUser._id))
			throw new NotFoundException('Email busy')

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}
		user.email = dto.email
		if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin

		await user.save()
		return
	}

	// получение количества всех юзеров
	async getCount() {
		return this.UserModel.find().count().exec()
	}

	//получение всех пользователей
	//searchTerm - поиск конкретного юзера в админке по email
	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			}
		// select убераем лишние поля у Юзера из базы данных -password -updateAt -__v
		return this.UserModel.find(options)
			.select('-password -updateAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	//удаление пользователя
	async delete(id: string) {
		return this.UserModel.findByIdAndDelete(id).exec()
	}
}
