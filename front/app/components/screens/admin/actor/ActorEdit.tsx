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
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import Heading from '@/components/ui/heading/Heading'

import { Meta } from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

// DynamicTextEditor = dynamic это для таого что бы TextEditor грузился только на клиенсткой части, так как он требует windows и на серверной будет выдавать ошибку
const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
)

//mode: 'onChange' - ошибка будет показыватся при изменении любого поля
const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)
	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />
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
							/>
							{/**Наша кнопка для генерации поля Slug из поля Title */}

							<SlugField
								generate={() =>
									setValue('slug', generateSlug(getValues('name')))
								}
								register={register}
								error={errors.slug}
							/>

							<Controller
								name="photo"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										image={value}
										error={error}
										folder="actors"
										placeholder="Photo"
									/>
								)}
								rules={{
									required: 'Photo is required!',
								}}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default ActorEdit
