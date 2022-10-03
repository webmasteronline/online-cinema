import { IMovie } from './../shared/types/movie.types';
import axios from 'api/interceptors'

import { IUser } from '@/shared/types/user.types'

import { getUsersUrl } from '@/configs/api.config'
import { IProfileInput } from '@/components/screens/profile/profile.interface';

//userService = {} - userService равно объект
export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	// axios - нужно быть авторизованным
	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'))
	},

	async getFavorites() {
		return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},

	async toggleFavorite(movieId: string) {
		return axios.put<string>(getUsersUrl('/profile/favorites'), {movieId})
	},
	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	//релизация удаления
	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},

	async getById(_id: string) {
		return axios.get<IUser>(getUsersUrl(`/${_id}`))
	},

	//релизация обновление
	async update(_id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},
}
