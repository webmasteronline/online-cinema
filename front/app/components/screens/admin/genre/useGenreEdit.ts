import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { GenreService } from '@/services/genre.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { IGenreEditInput } from './genre-edit.interface'

//(setValue: UseFormSetValue) при загрузке жанра при акссес(ответ что все запрос прошел успешно) мы сразу все наши данные могли записать в состояние наших полей нашей формы
export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter()

	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
				setValue('name', data.name)
			},
			onError: (error) => {
				toastError(error, 'Get genre')
			},
			enabled: !!query.id, // enabled срабатывает этот параметр только когда есть - query.id   (для того что бы когда бует undefined что бы тоже не сработало)
		}
	)
	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onError: (error) => {
				toastError(error, 'Update genre')
			},
			onSuccess() {
				// собщение что все ОК и перенаправить на страницу всех жанров push()
				toastr.success('Update genre', 'update was successful')
				push(getAdminUrl('genres'))
			},
		}
	)
	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
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
