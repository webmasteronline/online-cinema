import { IGalleryItem } from '@/components/ui/gallery/gallery.types'

import { ISlide } from '@/ui/slider/slider.types'

import { IMovie } from '@/shared/types/movie.types'

//trendingMovies: IGalleryItem[] - главная страница отдел Trending now галерея
//actors: IGalleryItem[] - главная страница отдел Best actors галерея
export interface ISlideMovie
	extends Pick<IMovie, '_id' | 'bigPoster' | 'title' | 'genres' | 'slug'> {}
export interface IHome {
	slides: ISlide[]
	trendingMovies: IGalleryItem[]
	actors: IGalleryItem[]
}
