import { axiosClassic } from 'api/interceptors'
import Cookies from 'js-cookie'

import { getAuthUrl } from '@/configs/api.config'

import { register } from '@/store/user/user.actions'
import { IAuthResponse } from '@/store/user/user.interface'

import { RefreshTokenDto } from './../../../../back/src/auth/dto/refreshToken.dto'
import { getContentType } from './../../api/api.helpers'
import { removeTokensStorage, saveToStorage } from './auth.halper'

export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},

	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{ email, password }
		)
		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},
	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{ refreshToken },
			{ headers: getContentType() }
		)
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},
}
