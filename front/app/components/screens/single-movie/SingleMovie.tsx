import Gallery from '@/components/ui/gallery/Gallery'
import Banner from '@/ui/banner/Banner'
import SubHeading from '@/ui/heading/SubHeading'
import { Meta } from '@/utils/meta/Meta'
import { FC } from 'react'

import { IMoviePage } from '../../../../pages/movie/[slug]'
import Content from './Content/Content'

const SingleMovie: FC<IMoviePage> = ({movie,similarMovies}) => {
	return <Meta title={movie?.title} description={`Watch ${movie?.title}`}>
		<Banner image={movie.bigPoster} Detail= {()=> <Content movie={movie}/>}/>

		{/**Vidio player */}
		<div className='mt-12'>
		<SubHeading title='Similar movie'/>
		<Gallery items={similarMovies}/>

		</div>
		{/**Raiting */}
	</Meta>
}

export default SingleMovie
