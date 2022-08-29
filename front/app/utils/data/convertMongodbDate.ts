export const convertMongodbDate = (date: string) =>
	new Date(date).toLocaleDateString('ru')
