import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {
	const { user } = useAuth()
	const router = useRouter()

	const Children = () => <>{children}</>

	//если нету !isOnlyAdmin И !isOnlyUser
	//if (!isOnlyAdmin && !isOnlyUser) return <Children />  //убираем так как мы делаем эту проверку в AuthProvider.tsx - return !isOnlyAdmin && !isOnlyUser

	if (user?.isAdmin) return <Children />

	if (isOnlyAdmin) {
		router.pathname !== '404' && router.replace('/404')
		return null // это компонент и роэтому он должен вернуть либо jsx либо null
	}

	//если есть user и он не является админом (isAdmin) то это isUser = user
	const isUser = user && !user.isAdmin

	if (isUser && isOnlyUser) return <Children />
	else {
		router.pathname !== 'auth' && router.replace('/auth')
		return null
	}
}

export default CheckRole
