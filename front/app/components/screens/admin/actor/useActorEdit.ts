import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ActorService } from '@/services/actor.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { IActorEditInput } from './actor-edit.interface'

//(setValue: UseFormSetValue) при загрузке жанра при акссес(ответ что все запрос прошел успешно) мы сразу все наши данные могли записать в состояние наших полей нашей формы
export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter()

	const actorId = String(query.id)

	const { isLoading } = useQuery(
		['actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
				setValue('name', data.name)
			},
			onError: (error) => {
				toastError(error, 'Get actor')
			},
			enabled: !!query.id, // enabled срабатывает этот параметр только когда есть - query.id   (для того что бы когда бует undefined что бы тоже не сработало)
		}
	)
	const { mutateAsync } = useMutation(
		'update actor',
		(data: IActorEditInput) => ActorService.update(actorId, data),
		{
			onError: (error) => {
				toastError(error, 'Update actor')
			},
			onSuccess() {
				// собщение что все ОК и перенаправить на страницу всех жанров push()
				toastr.success('Update actor', 'update was successful')
				push(getAdminUrl('actors'))
			},
		}
	)
	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
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
