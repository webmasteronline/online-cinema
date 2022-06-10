import { RefreshTokenDto } from './dto/refreshToken.dto'
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { hash, genSalt, compare } from 'bcryptjs'

import { UserModel } from './../user/user.model'
import { AuthDto } from './dto/auth.dto'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokenPair(String(user._id))
		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	//refreshToken -вытаскиваем сразу так как мы с ним будем работать а не с dto
	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) throw new UnauthorizedException('Please sing in !')

		//верифицируем наш токен. для этого берем jwtService у него verifyAsync и уже в него опракидываем наш токен (refreshToken)
		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid token or expired')

		//берем нашего user по _id из тоекна. мы заложили в токен id юзера  когда формировали токен
		const user = await this.UserModel.findById(result._id)

		const tokens = await this.issueTokenPair(String(user._id))
		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async register(dto: AuthDto) {
		//ищем oldUser если уже есть юзер с таким email то мы его получим и в таком случае мы выдадим ошибку  - BadRequestException('User with this email is already in the system')
		const oldUser = await this.UserModel.findOne({ email: dto.email })
		if (oldUser)
			throw new BadRequestException(
				'User with this email is already in the system'
			)

		//прокидываем не просто dto а email and pass что бы можно было захешировать hash(dto.password, salt)
		// с помощью salt мы зашифровали наш пароль
		const salt = await genSalt(10)
		const newUser = new this.UserModel({
			email: dto.email,
			password: await hash(dto.password, salt),
		})

		const user = await newUser.save()
		const tokens = await this.issueTokenPair(String(user._id))
		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}
	//Promise<UserModel> - указывать не обязятельно (это обозначает что мы возвращаем конкретно UserModel)
	async validateUser(dto: AuthDto): Promise<UserModel> {
		const user = await this.UserModel.findOne({ email: dto.email })
		if (!user) throw new UnauthorizedException('User not found')

		//сравниваем пароль из dto(который пришел из вне) и пароль нашего юзера который находится в базе данных
		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}
	async issueTokenPair(userId: string) {
		const data = { _id: userId }
		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d',
		})
		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h',
		})
		return { refreshToken, accessToken }
	}
	//получаем нашего юзера UserModel но возвращаем не все поля, а только те которые нам нужны
	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	}
}
