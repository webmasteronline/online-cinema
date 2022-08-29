import React from 'react'

export interface ISeo {
	title: string
	description?: string | undefined
	image?: string
	//children: React.ReactElement
	children: Array<JSX.Element> //если несколько дочерних элементов будет то с children: React.ReactElement выдаст ошибку - поэтому сделал так
}
