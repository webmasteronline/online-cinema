// так как эта gallery будет универсальной - будем ее испотзовать не только на главноей страничке но и даже в каталоге плюс вертикально
//content?: он будет не везде использоватся поэтому не обязательный параметр
export interface IGalleryItem {
	posterPath: string
	name: string
	link: string
	content?: {
		title: string
		subTitle?: string
	}
}

//вертикальная горизотальная реализация gallery
export interface IGalleryItemProps {
	item: IGalleryItem
	variant: 'horizontal' | 'vertical'
}
