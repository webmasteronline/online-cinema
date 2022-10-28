import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { useAuth } from '@/hooks/useAuth'

import { RatingService } from '@/services/rating.service'

import { toastError } from '@/utils/toast-error'

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { user } = useAuth()

	const { refetch } = useQuery(
		['your movie rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data)
			},
			onError: (error) => {
				toastError(error, 'Get rating')
			},
			enabled: !!movieId && !!user, // enabled срабатывает этот параметр только когда есть - movieId  (для того что бы когда бует undefined что бы тоже не сработало) !! - двазнака что бы перевести в будеан значение
		}
	)
	const { mutateAsync: rateMovie } = useMutation(
		'set rating movie',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onError(error) {
				toastError(error, 'Rate movie')
			},
			onSuccess() {
				toastr.success('Rate movie', 'You have successfully rated!')

				setIsSended(true)
				refetch()

				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			},
		}
	)

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await rateMovie({ value: nextValue })
	}
	return { isSended, rating, handleClick }
}
