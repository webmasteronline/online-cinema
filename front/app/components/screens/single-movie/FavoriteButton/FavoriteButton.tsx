import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { useAuth } from '@/hooks/useAuth'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import HeartImage from '../../../../../public/heart-animation.png'
import { useFavorites } from '../../favorites/useFavorites'

import styles from './FavoriteButton.module.scss'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const { user } = useAuth()

	if (!user) return null //если юзер незалогинился то не показываем кнопку сердечко фаворитМовье
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoriteMovies, refetch } = useFavorites()

	//при загрузки страницы мы будем проверять favoriteMovies если там есть фильм в избранном значит буем помечать кнопку что в избраном
	useEffect(() => {
		if (!favoriteMovies) return

		//.some возращает в ответе tru либо false
		//(f => f._id === movieId) если favorite id  равен movieId(это тот фильм на который мы зашли) значит он в избранном и вернется tru в обратном false
		const isHasMovie = favoriteMovies.some((f) => f._id === movieId)

		//isSmashed текучее состоянеее если не равно рельтату проверки то меняем стейт в соответствие проверки true(есть в избранном) false(нету в избраном)
		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
	}, [])

	const { mutateAsync } = useMutation(
		'update favorites',
		() => UserService.toggleFavorite(movieId),
		{
			onError: (error) => {
				toastError(error, 'Update favorite list')
			},
			onSuccess() {
				setIsSmashed(!isSmashed)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url(${HeartImage.src})` }}
		/>
	)
}

export default FavoriteButton
