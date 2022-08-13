import { IUser } from '@/shared/types/user.types'

export interface IUserState {
	email: string
	isAdmin: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

/* user: IUserState | null - для того что бы у нас не было пустого объекта , так как пустой объект мы не можем удобно проверить , а тут мы можем просто написать проверку  - user ? auth : (не авторизирован)*/

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

//для входных данный что бы мы в своих экшенах прописывали данный интерфейс
export interface IEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser & {
		isAdmin: boolean
	}
}
