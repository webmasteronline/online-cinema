import { FC } from 'react'
import { useForm } from 'react-hook-form'

import AuthFields from '@/components/shared/user/AuthFields'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/form-elements/Button'
import Heading from '@/components/ui/heading/Heading'

import { Meta } from '@/utils/meta/Meta'

import { IProfileInput } from './Profile.interface'
import styles from './Profile.module.scss'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)
	return (
		<Meta title="Profile">
			<Heading title="Profile" className="mb-6" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields formState={formState} register={register} />
				)}
				<Button>Update</Button>
			</form>
		</Meta>
	)
}

export default Profile
