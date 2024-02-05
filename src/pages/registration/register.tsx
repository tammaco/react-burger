
import styles from './registration.module.css';
import { EmailInput, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm'
import { useLazyRegisterQuery } from '../../hooks/useApi'

import { FormEvent, useEffect } from 'react'
import { useAppDispatch } from '../../components/hooks'
import { Link } from 'react-router-dom';

import { setUser, setIsAuthChecked } from '../../services/slices/userSlice'
import { isErrorWithMessage } from '../../utils/types';

export function Register(): React.JSX.Element {
    const { formData, handleInputChange } = useForm({
        userName: '',
        email: '',
        password: '',
    });

    const dispatch = useAppDispatch();
    const [trigger, data] = useLazyRegisterQuery();

    useEffect(() => {
        if (data && data.data?.success) {
            localStorage.setItem("refreshToken", data.data?.refreshToken);
            localStorage.setItem("accessToken", data.data?.accessToken);
            dispatch(setUser(data.data?.user));
            dispatch(setIsAuthChecked(true));
        }
    }, [data])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        trigger({ email: formData.email, password: formData.password, name: formData.userName });
    }

    return (
        <div className={styles.layout}>

            <p className="text text_type_main-medium mb-6">Вход</p>
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                    type='text'
                    placeholder={'Имя'}
                    onChange={handleInputChange}
                    value={formData.userName || ''}
                    name='userName'
                    extraClass="mb-6"
                />

                <EmailInput
                    onChange={handleInputChange}
                    value={formData.email || ''}
                    name='email'
                    placeholder="Логин"
                    extraClass="mb-6"
                />

                <PasswordInput
                    onChange={handleInputChange}
                    value={formData.password || ''}
                    name='password'
                    extraClass="mb-6"
                />

                <Button htmlType="submit" type="primary" extraClass="mb-20" size="large">Зарегистрироваться</Button>
            </form>

            {data.isError && <p>Ошибка: {isErrorWithMessage(data.error) ? data.error?.message : JSON.stringify(data.error)}</p>}

            <div className={styles.aditional_actions}>
                <p className="text text_type_main-default text_color_inactive mr-1">Уже зарегистрированы?</p>
                <p className='text text_type_main-default'>
                    <Link to='/login' className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    )
}