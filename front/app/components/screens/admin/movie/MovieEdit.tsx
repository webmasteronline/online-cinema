import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import formStyles from '@/components/shared/admin/adminForm.module.scss'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import Heading from '@/components/ui/heading/Heading'

import { Meta } from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import { IGenreEditInput } from './movie-edit.interface'
import { useGenreEdit } from './useMovieEdit'

// DynamicTextEditor = dynamic это для таого что бы TextEditor грузился только на клиенсткой части, так как он требует windows и на серверной будет выдавать ошибку
const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
)

//mode: 'onChange' - ошибка будет показыватся при изменении любого поля
const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)
	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Edit genre" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>
							{/**Наша кнопка для генерации поля Slug из поля Title */}
							<div style={{ width: '31%' }}>
								<SlugField
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
									register={register}
									error={errors.slug}
								/>
							</div>

							<Field
								{...register('icon', {
									required: 'Icon is required!',
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
						</div>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<DynamicTextEditor
									placeholder="Description"
									onChange={onChange}
									error={error}
									value={value}
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										'Description is required!',
								},
							}}
						/>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
