import { FC } from 'react'

import SearchField from '@/components/ui/search-field/SearchField'

import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()
	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{/*isSuccess && = true тогда мы показываем наш SearchList*/}
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
