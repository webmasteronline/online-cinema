import { IMovie } from '@/shared/types/movie.types'

//IMovie{} добавили Omit для того тчо бы убрать поле _id так как оно редактироваться не будет
export interface IMovieEditInput extends Omit<IMovie, '_id'> {}
