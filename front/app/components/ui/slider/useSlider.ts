import { useState } from 'react'

//length: number -какое количество елементов в массиве слайдера . useSlider принимает в себя length: number
export const useSlider = (length: number) => {
	//[currentIdx, setCurrentIdx] - отвечает за текущеее состояние слайда на экране за его индекс
	const [currentIdx, setCurrentIdx] = useState(0)
	//для анимации
	const [slideIn, setSlideIn] = useState(true)

	//существует ли следующий либо предыдущий слайд
	const isExistNext = currentIdx + 1 < length
	const isExistPrev = currentIdx ? currentIdx - 1 < length : false

	// один хендлер для двух стрелок будет срабатывать при нажатию на ту либо иную стрелку
	const handlerArrowClick = (direction: 'next' | 'prev') => {
		const newIndex = direction === 'next' ? currentIdx + 1 : currentIdx - 1

		setSlideIn(false) // значит убираем с экрана с анимацией котруюю сделаем  в css setSlideIn(true) - показывает слайд

		setTimeout(() => {
			setCurrentIdx(newIndex)
			setSlideIn(true)
		}, 300) //через задонное время поменяется индекс на новый ипоказыавем уже новый слайдер с новым индексом
	}
	return {
		slideIn,
		index: currentIdx,
		isNext: isExistNext,
		isPrev: isExistPrev,
		handleClick: handlerArrowClick,
	}
}
