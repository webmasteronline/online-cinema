import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/screens/templates/catalog-movies/Catalog'

import { IActor, IMovie } from '@/shared/types/movie.types'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'

//так как в оличие от freshPage нам тут нужен еще и второй параметр делаем  интерфейс в котоором будет movies: IMovie[] и + нужный нам параметр
interface IActorPage {
	movies: IMovie[]
	actor: IActor | undefined
}

const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
	return actor ? (
		<Catalog movies={movies || []} title={actor.name} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAll()
		const paths = actors.map((a) => ({
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

// что бы получить текущий слаг страницы напмример: /actor/action  - чт обы открылся именно action
//GetStaticProps = async ({ params }) - для этого исаользуем  params
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await ActorService.getBySlug(String(params?.slug)) //создаем endpoint получение по slug - getBySlug()
		const { data: movies } = await MovieService.getByActor(actor._id)
		return {
			props: { movies, actor },
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			props: {},
			//notFound: true,
		}
	}
}

export default ActorPage
