import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { MovieService } from '@/services/movie.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { IMovieEditInput } from './movie-edit.interface'

//(setValue: UseFormSetValue) при загрузке жанра при акссес(ответ что все запрос прошел успешно) мы сразу все наши данные могли записать в состояние наших полей нашей формы
export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter()

	const movieId = String(query.id)

	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError(error, 'Get movie')
			},
			enabled: !!query.id, // enabled срабатывает этот параметр только когда есть - query.id   (для того что бы когда бует undefined что бы тоже не сработало)
		}
	)
	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovieEditInput) => MovieService.update(movieId, data),
		{
			onError: (error) => {
				toastError(error, 'Update movie')
			},
			onSuccess() {
				// собщение что все ОК и перенаправить на страницу всех жанров push()
				toastr.success('Update movie', 'update was successful')
				push(getAdminUrl('movies'))
			},
		}
	)
	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}

/*
это устаревший способ если много полей то не удобно каждый описывать
onSuccess: ({ data }) => {
	setValue('name', data.name)
	setValue('name', data.name)
	setValue('name', data.name)
	setValue('name', data.name)
	setValue('name', data.name)
},
поэтому сдлаем лайвхак через forEach для это ипользуем нашу функцию - getKeys()
*/
