import { FC } from 'react'

import Search from './Search/Search'
import styles from './Sidebar.module.scss'

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			{/* Movies Container */}
		</div>
	)
}

export default Sidebar
