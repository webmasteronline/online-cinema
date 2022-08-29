import axios from 'api/interceptors'

import { IUser } from '@/shared/types/user.types'

import { getUsersUrl } from '@/configs/api.config'

//userService = {} - userService равно объект
export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	//релизация удаления
	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},
}
