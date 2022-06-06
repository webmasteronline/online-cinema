export class UserModel {
  _id: string
  email: string
  password: string
  isAdmin: boolean
  favorites?: [] //? не обезательно поле
}
