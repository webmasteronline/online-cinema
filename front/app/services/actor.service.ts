import { axiosClassic } from 'api/interceptors'
import axios from 'api/interceptors'

import { IActor } from '@/shared/types/movie.types'

import { getActorsUrl } from '@/configs/api.config'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	//релизация удаления
	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},
}
