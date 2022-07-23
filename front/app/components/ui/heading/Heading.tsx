import { FC } from 'react'

interface IHeading {
	title: string
	className?: string //className? ? - необезательный пораметр тоесть будет по умолчанию className или другой который мы укажем
}

const Heading: FC<IHeading> = ({ title, className }) => {
	return (
		<h1
			className={`text-white text-opacity-80 font-semibold ${
				className?.includes('xl') ? '' : 'text-3xl'
			}${className} `}
		>
			{title}
		</h1>
	)
}

export default Heading
/** ${
			className?.includes('xl') ? '' : 'text-3xl'}${className} `} 
			если мы задали размер className?.includes('xl') то будет ''
			если не задавил свой размер то будет по умолчанию срабатывать 'text-3xl'
*/
