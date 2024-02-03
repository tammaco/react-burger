
import styles from './registration.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm'
import { useLazyLoginQuery } from '../../hooks/useApi'

import { FormEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom';

import { setUser, setIsAuthChecked } from '../../services/slices/userSlice'
import { isErrorWithMessage } from '../../utils/types';

export function Login(): React.JSX.Element {
    const { formData, handleInputChange } = useForm({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const { email, password } = formData;
    const [trigger, result] = useLazyLoginQuery();

    useEffect(() => {
        if (result && result.data?.success) {
            localStorage.setItem("refreshToken", result.data?.refreshToken);
            localStorage.setItem("accessToken", result.data?.accessToken);
            dispatch(setUser(result.data?.user));
            dispatch(setIsAuthChecked(true));
        }
    }, [result])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        trigger({ email, password });
    }

    return (
        <div className={styles.layout}>

            <p className="text text_type_main-medium mb-6">Вход</p>
            <form className={styles.form} onSubmit={onSubmit}>
                <EmailInput
                    onChange={handleInputChange}
                    value={email || ''}
                    name='email'
                    placeholder="Логин"
                    extraClass="mb-6"
                />

                <PasswordInput
                    onChange={handleInputChange}
                    value={password || ''}
                    name='password'
                    extraClass="mb-6"
                />

                <Button htmlType="submit" type="primary" extraClass="mb-20" size="large">Войти</Button>
            </form>
            {result.isError && <p>Ошибка: {isErrorWithMessage(result.error) ? result.error?.message : JSON.stringify(result.error)}</p>}

            <div className={styles.aditional_actions}>
                <p className="text text_type_main-default text_color_inactive mr-1">Вы — новый пользователь?</p>
                <p className='text text_type_main-default'>
                    <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
                </p>
            </div>
            <div className={styles.aditional_actions}>
                <p className="text text_type_main-default text_color_inactive mr-1">Забыли пароль?</p>
                <p className='text text_type_main-default'>
                    <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
                </p>
            </div>

        </div>
    )
}