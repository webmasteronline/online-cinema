/* Эта функция ощищает наш текст от всего лишнего HTML теги и т.д.. и отдает нам голый текст */
export const onlyText = (
	_string: string,
	limit: null | number = null
): string => {
	let result = _string
		.replace(/<[^>]+>/g, '')
		.replace(/&[^;]+./g, ' ')
		.replace(
			/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
			''
		)
	// limit - количество символов в тексте можно ограничить если нужно
	if (limit) result = result.slice(0, limit) + '...'

	return result
}
