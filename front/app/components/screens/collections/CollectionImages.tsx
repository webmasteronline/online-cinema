import Image from 'next/image'
import { FC } from 'react'
import { ICollection } from './collections.interface'

//{collection:{image,title}} - делаем сразу деструктуризацию что бы не писать длинное имя collection
const CollectionImages: FC<{collection: ICollection}> = ({collection:{image,title}}) => {

	return <Image alt={title} src={image} layout="fill" draggable={false}/>
}

export default CollectionImages