import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { getGenresList } from './../../../../utils/movie/getGenresList'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['movies list', debouncedSearch],
		() => MovieService.getMovies(debouncedSearch),
		{
			//здесь данные будут трансформироваться- принимать вил нашей таблички
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				toastError(error, 'Movie list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie',
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastError(error, 'Delete list')
			},
			onSuccess: () => {
				toastr.success('Detele movie', 'delete was successful')
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
