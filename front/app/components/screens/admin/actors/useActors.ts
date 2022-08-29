import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { ActorService } from '@/services/actor.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['actors list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			//здесь данные будут трансформироваться- принимать вил нашей таблички
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastError(error, 'Actor list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete actor',
		(actorId: string) => ActorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastError(error, 'Delete list')
			},
			onSuccess: () => {
				toastr.success('Detele actor', 'delete was successful')
				queryData.refetch()
			},
		}
	)
	//используем useMemo так как будет много переменных и чтобы как-то оптимизировать это дело закешировать
	// и все это будет меняться при [queryData, searchTerm, deleteAsync]
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
