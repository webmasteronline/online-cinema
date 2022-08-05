/*если у нас пользователь нашел фильм для просмора но просмотр этого фильм только для зарегистрированных пользователей .
то после авторизации Redirect сразу вернет именно на эту страничку а не на главную или еще куда в раздел ...
*/
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

export const useAuthRedirect = () => {
	const { user } = useAuth()

	//query - это квери параметр а , push это для переадресации
	const { query, push } = useRouter()

	//если в query запроссе есть redirect то мы возвращаем редирект в строчном формате иначе на главную страничку
	const redirect = query.redirect ? String(query.redirect) : '/'

	//[user, redirect, push] отслеживает изменения и если у нас user есть то реализуем редирект
	useEffect(() => {
		if (user) push(redirect)
	}, [user, redirect, push])
}
