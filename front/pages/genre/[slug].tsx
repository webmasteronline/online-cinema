import { errorCatch } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/screens/templates/catalog-movies/Catalog'

import { IGenre, IMovie } from '@/shared/types/movie.types'

import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'

//так как в оличие от freshPage нам тут нужен еще и второй параметр делаем  интерфейс в котоором будет movies: IMovie[] и + нужный нам параметр
interface IGenrePage {
	movies: IMovie[]
	genre: IGenre
}

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
	return genre ? (
		<Catalog
			movies={movies || []}
			title={genre.name}
			description={genre.description}
		/>
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAll()

		const paths = genres.map((g) => ({
			params: { slug: g.slug },
		}))
		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		console.log('getStaticPaths', errorCatch(e))
		return {
			paths: [],
			fallback: false,
		}
	}
}

// что бы получить текущий слаг страницы напмример: /genre/action  - чт обы открылся именно action
//GetStaticProps = async ({ params }) - для этого исаользуем  params
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await GenreService.getBySlug(String(params?.slug)) //создаем endpoint получение по slug - getBySlug()
		const { data: movies } = await MovieService.getByGenres([genre._id])
		return {
			props: { movies, genre },
			revalidate: 60,
		}
	} catch (e) {
		console.log('getStaticProps', errorCatch(e))

		return {
			//props: {},
			notFound: true,
		}
	}
}

export default GenrePage
