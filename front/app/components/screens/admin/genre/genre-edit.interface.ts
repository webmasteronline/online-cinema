import { IGenre } from '@/shared/types/movie.types'

//IGenre{} добавили Omit для того тчо бы убрать поле _id так как оно редактироваться не будет
export interface IGenreEditInput extends Omit<IGenre, '_id'> {}
