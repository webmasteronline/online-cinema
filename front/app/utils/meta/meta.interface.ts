import React from 'react'

export interface ISeo {
	title: string
	description?: string | undefined
	image?: string
	children: React.ReactElement
}
