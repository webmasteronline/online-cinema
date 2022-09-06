import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { ActorService } from '@/services/actor.service'

import { toastError } from '@/utils/toast-error'

export const useAdminActors = () => {
	const queryData = useQuery('List of actors', () => ActorService.getAll(), {
		//в каком виде нам нужно отдавать данные react-select принимает данные в формате из двух полей label и value
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),
		onError: (error) => {
			toastError(error, 'Actor list')
		},
	})
	return queryData
}
