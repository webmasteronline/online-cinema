import { IUser } from '@/shared/types/user.types'

//IGenre{} добавили Omit для того тчо бы убрать поле _id так как оно редактироваться не будет
export interface IUserEditInput extends Omit<IUser, '_id' | 'createdAt'> {}
