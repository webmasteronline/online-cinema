import { type } from 'os'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'

import { useAuth } from '@/hooks/useAuth'

import { Meta } from '@/utils/meta/Meta'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	//форма будет работать в двух направлениях и при Авторизации и при Регистрации
	//по умолчанию будет login
	//и в следствие в зависимости от type будем выполнять ту или иную функцию
	const [type, setType] = useState<'login' | 'register'>('login')

	//mode: 'onChange' - ошибка будет вывожится при любом изменении полей , а не только при нажатии на кнопку submit
	//register: registerInput переназначаем что бы не было одинаковых названии
	//register: registerInput - Этот метод позволяет зарегистрировать ввод или выбрать элемент и применить правила проверки к форме React Hook
	//handleSubmit - Эта функция получит данные формы, если проверка формы прошла успешно.
	//formState - Этот объект содержит информацию обо всем состоянии формы. Это поможет вам отслеживать взаимодействие пользователя с вашим приложением формы.
	//reset - сброс формы
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})

	const login = (data: any) => {
		console.table(data)
	}
	const register = (data: any) => {
		console.table(data)
	}

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') login(data)
		else if (type === 'register') register(data)
		//сбрасываем формы
		reset()
	}

	return (
		<Meta title="Auth">
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Auth" className="mb-6 text-3xl" />
					<AuthFields
						register={registerInput}
						formState={formState}
						isPasswordRequired
					/>
					<div className={styles.buttons}>
						<Button
							type="submit"
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Login
						</Button>
						<Button
							type="submit"
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
