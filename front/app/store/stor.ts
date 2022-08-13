import { configureStore } from '@reduxjs/toolkit'

import { reducers } from './rootReducer'

export const store = configureStore({
	reducer: reducers,
	devTools: true,
})

/*тип нашего хранилища что бы понять какие у него состояния какие у него есть данные 
	экспортрум тайп и делаем ретурн тайп получаем наше состояние и берем от него именно тип с помощью typeof и с помошью ReturnType мы возвращаем тот самы Тип
*/
export type TypeRootState = ReturnType<typeof store.getState>
