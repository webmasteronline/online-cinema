export interface ITableItem {
	_id: string
	editUrl: string //кнопка для редактирования
	items: string[]
}

export interface IAdminTableItem {
	tableItem: ITableItem
	removeHandler: (id: string) => void //при нажатие крестик для удаления item
}
