import { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

//это именно наши пропсы
export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}

//к нашим пропсам нам нужно приплюсовать те пропcы которые идут изначально в input - onChange , value ....
//тем самым у нас получается совмещенный тип
type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

// и теперь уже export IField который мы будем использовать в дальнейшем от нашего совмещенного типа TypeInputPropsField
export interface IField extends TypeInputPropsField {}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}
