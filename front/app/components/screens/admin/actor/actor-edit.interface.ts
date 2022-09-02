import { IActor } from '@/shared/types/movie.types'

//IActor{} добавили Omit для того тчо бы убрать поле _id так как оно редактироваться не будет
export interface IActorEditInput extends Omit<IActor, '_id'> {}
