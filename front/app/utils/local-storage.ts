export const getStoreLocal = (name: string) => {
	/* ксли localStorage все таки есть , то получаем getItem по нашему name - например нужно получить юзера*/
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : null
	}
	return null
}
