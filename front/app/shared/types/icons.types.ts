import * as MaterialIcons from 'react-icons/md'

//Очень удобно использлвать 
//MaterialIcons.  и выпадет весь список иконок

 export type TypeMaterialIconName = keyof typeof MaterialIcons

//вставляем в наш интерфейс IMenuItem
// export interface IMenuItem {
// 	icon: TypeMaterialIconName
// 	title: string
// 	link: string
// }