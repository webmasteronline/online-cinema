import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number): T => {
	//задается состояние с помощью value - которое приходит строчкой выше
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	// дальше мы делаем useEffect и каждый раз когда изменяется value мы делаем setTimeout - задержку
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}
