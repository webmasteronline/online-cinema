export const getGenresListEach = (
	index: number,
	length: number,
	name: string
) => (index + 1 === length ? name : name + ', ')

// будет выводить строку в которй через запятую будут категории данного фильма

interface IArrayItem {
	name: string
}

export const getGenresList = (array: IArrayItem[]) =>
	array.map((i) => i.name).join(', ')
