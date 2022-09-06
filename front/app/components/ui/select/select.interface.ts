import { ControllerRenderProps } from 'react-hook-form'
import { Options } from 'react-select'

import { IFieldProps } from './../form-elements/form.interface'

export interface IOption {
	value: string
	label: string
}

export interface ISelect extends IFieldProps {
	options: Options<IOption>
	isMulti?: boolean //выборка одного елемента или многих
	field: ControllerRenderProps<any, any> //это поле мы будем передавать в нашем контроллере из реакт хук форм
	isLoading?: boolean
}
