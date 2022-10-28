import { errorCatch } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'
import { IGalleryItem } from '@/components/ui/gallery/gallery.types'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import { getMovieUrl } from '@/configs/url.config'

import Error404 from '../404'

//так как в оличие от freshPage нам тут нужен еще и второй параметр делаем  интерфейс в котоором будет movies: IMovie[] и + нужный нам параметр
export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie similarMovies={similarMovies || []} movie={movie} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getMovies()
		const paths = movies.map((a) => ({
			params: {
				slug: a.slug,
			},
		}))
		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

// что бы получить текущий слаг страницы напмример: /movie/action  - чт обы открылся именно action
//GetStaticProps = async ({ params }) - для этого исаользуем  params
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug)) //создаем endpoint получение по slug - getBySlug()
		/** от конкретного фильма берем все все жанры movie.genres и возвращаем id  каждого жанра map(g=>g._id)*/
		const responseSimilarMovies = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		)
		//так же делаем фильтрацию так как мы получим все фильмы этих жанров , но так же мы получим и текущий фильм он тоже будет в галерии снизу а это не красиво раз он уже запущен и мы его смотрим .filter и исключаем по id текущий фильм
		const similarMovies: IGalleryItem[] = responseSimilarMovies.data
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}))

		console.log('similarMovies', similarMovies)

		return {
			props: { movie, similarMovies },
			revalidate: 60,
		}
	} catch (e) {
		//console.log(errorCatch(e))

		return {
			//props: {},
			notFound: true,
		}
	}
}

export default MoviePage
