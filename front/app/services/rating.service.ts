import axios from 'api/interceptors'


import { getRatingsUrl } from '@/configs/api.config'

//ratingService = {} - ratingService равно объект
export const RatingService = {
	//релизация обновление
	async setRating(movieId: string, value: number) {
		return axios.post<string>(getRatingsUrl(`/set-rating`), {
			movieId, value
		})
	},

	async getByUserMovie(movieId: string) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`))
	},

}
