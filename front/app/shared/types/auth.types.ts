import { NextPage } from 'next'
import React from 'react'

//ProfilePage.isOnlyAdmin = true  //isOnlyAdmin-этот параметр мы здесь описываем
export type TypeRoles = {
	isOnlyAdmin?: boolean
	isOnlyUser?: boolean
}

//ProfilePage. что бы появилась подскзка после точки (тобишь метод) мы его тут описываем
export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles
export type TypeComponentAuthFields = {
	Component: TypeRoles
	children?: React.ReactElement
}
