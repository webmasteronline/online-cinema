import { axiosClassic } from 'api/interceptors'
import axios from 'api/interceptors'

import { IActorEditInput } from '@/components/screens/admin/actor/actor-edit.interface'

import { IActor } from '@/shared/types/movie.types'

import { getActorsUrl } from '@/configs/api.config'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},
	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},
	//релизация создания
	//пустой отправляет только Post запрос
	async create() {
		return axios.post<string>(getActorsUrl('/'))
	},
	//релизация обновление
	async update(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},
	//релизация удаления
	async delete(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},
}
