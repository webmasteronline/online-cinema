import { FC } from 'react'

import Button from '@/ui/form-elements/Button'

// принимает только одно поэтому интерфейс делать не будем , а просто опишем - FC<{ onClick?: () => void }>

const AdminCreateButton: FC<{ onClick?: () => void }> = ({ onClick }) => {
	return <Button onClick={onClick}>Create new</Button>
}

export default AdminCreateButton
