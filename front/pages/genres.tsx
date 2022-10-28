import { errorCatch } from 'api/api.helpers'
import { GetStaticProps, NextPage } from 'next'

import Collections from '@/components/screens/collections/Collections'
import { ICollection } from '@/components/screens/collections/collections.interface'

import { GenreService } from '@/services/genre.service'

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return <Collections collections={collections || []} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		//	const { data: movies } = await MovieService.getMostPopularMovies() - тут делаем по другому так как мы в getMostPopularMovies возвращаем уже контент а не data
		const { data: collections } = await GenreService.getCollections()

		return {
			props: { collections },
			revalidate: 60,
		}
	} catch (e) {
		console.log(errorCatch(e))

		return {
			notFound: true,
		}
	}
}

export default GenresPage
