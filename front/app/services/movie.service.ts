import axios from 'api/interceptors'

import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface'

import { IMovie } from '@/shared/types/movie.types'

import { getMoviesUrl } from '@/configs/api.config'

import { axiosClassic } from './../api/interceptors'

export const MovieService = {
	async getMovies(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)
		return movies
	},

	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
	},

	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIds,
		})
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},

	//релизация создания
	//пустой отправляет только Post запрос
	async create() {
		return axios.post<string>(getMoviesUrl('/'))
	},
	//релизация обновление
	async update(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},
	//релизация удаления
	async delete(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},
}
