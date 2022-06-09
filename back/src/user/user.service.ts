import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from 'src/user/user.model'
import { InjectModel } from 'nestjs-typegoose'
import { Injectable, NotFoundException } from '@nestjs/common'

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
}
