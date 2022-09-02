import { useQuery } from 'react-query'

import { GenreService } from '@/services/genre.service'

import { getGenreUrl } from '@/configs/url.config'

import { IMenuItem } from '../menu.types'

/* our hook */
//будет овечать за подачу наших данных с базы данных

export const usePopularGenres = () => {
	const queryData = useQuery(
		'popular genre menu',
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data
					//.filter(genre => genre.icon) - добавили этот код если в жанре поле любое допустим icon заполнено тоесть существует то только тогда выводить
					.filter((genre) => genre.icon)
					.map(
						(genre) =>
							({
								icon: genre.icon,
								link: getGenreUrl(genre.slug),
								title: genre.name,
							} as IMenuItem)
					)
					.splice(0, 4),
		}
	)

	return queryData
}
