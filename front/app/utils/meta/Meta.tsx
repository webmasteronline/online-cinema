import Head from 'next/head'
import asPath, { useRouter } from 'next/router'
import { FC } from 'react'

import logoImage from '@/assets/images/logo.svg'

import { siteName, titleMerge } from '@/configs/seo.config'

import { onlyText } from '../string/clearText'

import { ISeo } from './meta.interface'

export const Meta: FC<ISeo> = ({ title, description, image, children }) => {
	const {} = useRouter()
	const currentUrl = `${process.env.APP_URL}${asPath}`

	return (
		<>
			{description ? (
				<Head>
					/*itemProp - очень важная разметка для поисковых систем */
					<title itemProp="headline">{titleMerge(title)}</title>
					/* если description есть то мы выводим для общего доступа эту страницу
					если нет значит это у нас админ страница страница аторизации ... не
					для поисковых систем исключаем ее .*/
					<meta
						itemProp="description"
						name="description"
						/*152 - кол символов */
						content={onlyText(description!, 152)}
					/>
					<link rel="canonical" href={currentUrl} />
					<meta property="og:locale" content="en" />
					<meta property="og:title" content={titleMerge(title)} />
					<meta property="og:url" content={currentUrl} />
					<meta property="og:image" content={image || logoImage} />
					<meta property="og:site_name" content={siteName} />
					<meta
						property="og:description"
						content={onlyText(description!, 197)}
					/>
				</Head>
			) : (
				<meta name="robots" content="noindex, nofollow" />
			)}
			{children}
		</>
	)
}
