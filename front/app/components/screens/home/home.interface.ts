import { IGalleryItem } from '@/components/ui/gallery/gallery.types'

import { ISlide } from '@/ui/slider/slider.types'

//trendingMovies: IGalleryItem[] - главная страница отдел Trending now галерея
//actors: IGalleryItem[] - главная страница отдел Best actors галерея

export interface IHome {
	slides: ISlide[]
	trendingMovies: IGalleryItem[]
	actors: IGalleryItem[]
}
