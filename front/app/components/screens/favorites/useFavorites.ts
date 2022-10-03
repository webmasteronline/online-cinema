import { useQuery } from 'react-query'

import { UserService } from './../../../services/user.service'

export const useFavorites = () => {
	//refetch для того тчо бы мы без перезагрузки страницы сразу обновили состояние и показали элемент избранного
	const {		isLoading,		data: favoriteMovies,		refetch,	} = useQuery('faforite movies', () => UserService.getFavorites(), {
		select: ({ data }) => data,
	})

	return {
		isLoading,
		favoriteMovies,
		refetch,
	}
}
