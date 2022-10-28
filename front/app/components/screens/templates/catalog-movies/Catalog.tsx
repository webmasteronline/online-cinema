import { FC } from 'react'

import GalleryItem from '@/components/ui/gallery/GalleryItem'
import Description from '@/components/ui/heading/Description'
import Heading from '@/components/ui/heading/Heading'

import { Meta } from '@/utils/meta/Meta'

import { getMovieUrl } from '@/configs/url.config'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.types'

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{<Description text={description} className={styles.description} />}

			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						variant="horizontal"
						item={{
							name: movie.title,
							posterPath: movie.bigPoster,
							link: getMovieUrl(movie.slug),
							content: {
								title: movie.title,
							},
						}}
					/>
				))}
			</section>
		</Meta>
	)
}

export default Catalog
