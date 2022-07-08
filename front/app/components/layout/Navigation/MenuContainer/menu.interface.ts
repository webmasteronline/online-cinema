import { TypeMaterialIconName } from '@/shared/types/icons.types'

export interface IMenuItem {
	icon: TypeMaterialIconName
	title: string
	link: string
}

//итнерфейс для меню их будет несколько в левом сайдбаре 3 и один в правом 
//в интерфесе мы описываем общие черты сущности
export interface IMenu {
	title: string
	items: IMenuItem[]
}