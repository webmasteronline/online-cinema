export const accentColor = '#E30B13'
export const bgColor = '#191B1F'

/*если у нас нету window то это Серверная чать */
export const IS_SERVER = typeof window === 'undefined'
/*если window есть значит клиенсткая часть  */
export const IS_CLIENT = typeof window !== 'undefined'
