export interface ILink {
	_id: string
	link: string
	title: string
}
/* Один IContentList это одна строка Ganres: Adventure, Action, Fantasy 
Ganres: это name: string
Adventure, Action, Fantasy - это links: ILink[]

так же Актеры
*/
export interface IContentList{
	name: string
	links: ILink[]
}