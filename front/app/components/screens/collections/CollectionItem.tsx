import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

import { getGenreUrl } from '@/configs/url.config'

import CollectionImages from './CollectionImages'
import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={getGenreUrl(collection.slug)}>
			<a className={styles.collection}>
				<CollectionImages collection={collection} />
				<div className={styles.content}>
					<div className={styles.title}>{collection.title}</div>
				</div>

				<div className={cn(styles.behind, styles.second)}>
					<CollectionImages collection={collection} />
				</div>
				<div className={cn(styles.behind, styles.third)}>
					<CollectionImages collection={collection} />
				</div>
			</a>
		</Link>
	)
}

export default CollectionItem
