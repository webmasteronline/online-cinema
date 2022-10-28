import { useQuery } from 'react-query'

import { useAuth } from '@/hooks/useAuth'

import { UserService } from './../../../services/user.service'

//refetch для того тчо бы мы без перезагрузки страницы сразу обновили состояние и показали элемент избранного
export const useFavorites = () => {
	const { user } = useAuth()

	const {
		isLoading,
		data: favoriteMovies,
		refetch,
	} = useQuery('faforite movies', () => UserService.getFavorites(), {
		select: ({ data }) => data,
		enabled: !!user,
	})

	return {
		isLoading,
		favoriteMovies,
		refetch,
	}
}
