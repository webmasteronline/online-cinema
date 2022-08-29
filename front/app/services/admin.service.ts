import axios from 'api/interceptors'

import { getUsersUrl } from './../configs/api.config'

export const AdminService = {
	async getCountUsers() {
		//этот axios будет являтся авторизованным сразу все запросы которые будут идти через него будут идти с токкеном
		return axios.get<number>(getUsersUrl('/count'))
	},
}
