import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['genres list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			//здесь данные будут трансформироваться- принимать вил нашей таблички
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				toastError(error, 'Genre list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create genre',
		//передавать мы тут ничего не будем поэтому пусто
		() => GenreService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create list')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create genre', 'create was successful')
				//refetch() здесь мы уже не рефетчим а перенаправляем на страницу редактирования после создания сучности
				//onSuccess: ({ data: _id }) берем id по нему мы будем именно эту сучность и редактировать
				push(getAdminUrl(`genre/edit/${_id}`))
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		'delete genre',
		(genreId: string) => GenreService.delete(genreId),
		{
			onError: (error) => {
				toastError(error, 'Delete list')
			},
			onSuccess: () => {
				toastr.success('Detele genre', 'delete was successful')
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
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
