import axios from 'api/interceptors'

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
	//релизация удаления
	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},
}
