import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { IUserEditInput } from './user-edit.interface'

//(setValue: UseFormSetValue) при загрузке жанра при акссес(ответ что все запрос прошел успешно) мы сразу все наши данные могли записать в состояние наших полей нашей формы
export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { push, query } = useRouter()

	const userId = String(query.id)

	const { isLoading } = useQuery(
		['user', userId],
		() => UserService.getById(userId),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email)
				setValue('isAdmin', data.isAdmin)
			},
			onError: (error) => {
				toastError(error, 'Get user')
			},
			enabled: !!query.id, // enabled срабатывает этот параметр только когда есть - query.id   (для того что бы когда бует undefined что бы тоже не сработало)
		}
	)
	const { mutateAsync } = useMutation(
		'update user',
		(data: IUserEditInput) => UserService.update(userId, data),
		{
			onError: (error) => {
				toastError(error, 'Update user')
			},
			onSuccess() {
				// собщение что все ОК и перенаправить на страницу всех жанров push()
				toastr.success('Update user', 'update was successful')
				push(getAdminUrl('users'))
			},
		}
	)
	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}
