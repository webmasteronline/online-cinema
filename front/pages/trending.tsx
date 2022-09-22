import { errorCatch } from 'api/api.helpers'
import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/screens/templates/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Trending movies"
			description="Trending movies in excellent quality: legal, safe, without ads"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		//	const { data: movies } = await MovieService.getMostPopularMovies() - тут делаем по другому так как мы в getMostPopularMovies возвращаем уже контент а не data
		const movies = await MovieService.getMostPopularMovies()

		return {
			props: { movies },
		}
	} catch (e) {
		console.log(errorCatch(e))

		return {
			notFound: true,
		}
	}
}

export default TrendingPage
