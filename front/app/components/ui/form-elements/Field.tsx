import cn from 'classnames'
import { forwardRef } from 'react'

import { IField } from './form.interface'
import styles from './form.module.scss'

/*
//forwardRef для чего - мы не можем передать просто пропсы свои в компонент Field: FC - так как у нас идет привязка к react-hook-form там удет передача таким образом ...register и он передает ref на прямую к нашему полю и если мы не используем forwardRef то этот ref приведет тупо к нашему компоненту и так не будет работать как нам нужно. нам нужно передать наши референс гораздо глубже. для этого используем forwardRef
*/
const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type={type} {...rest} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
