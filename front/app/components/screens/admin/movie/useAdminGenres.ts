import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'

export const useAdminGenres = () => {
	const queryData = useQuery('List of genres', () => GenreService.getAll(), {
		//в каком виде нам нужно отдавать данные react-select принимает данные в формате из двух полей label и value
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError: (error) => {
			toastError(error, 'Genre list')
		},
	})
	return queryData
}
