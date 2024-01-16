
import styles from './registration.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { SyntheticEvent, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm'
import { useLazyPasswordResetResetQuery } from '../../hooks/useApi'

export function ResetPassword(): React.JSX.Element {

    const { formData, handleInputChange } = useForm({
        secretCode: '',
        password: '',
    });

    const navigate = useNavigate();
    const [trigger, data] = useLazyPasswordResetResetQuery();

    useEffect(() => {
        if (data && data.data?.success) {
            localStorage.removeItem("fromForgotPassword");
            navigate('/login');
        }
    }, [data])

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        trigger({ password: formData.password, token: formData.secretCode });
    }

    if (localStorage.getItem("fromForgotPassword") === null)
        return <Navigate to='/forgot-password'></Navigate>

    return (
        <div className={styles.layout}>

            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

            <form className={styles.form} onSubmit={onSubmit}>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={handleInputChange}
                    value={formData.password || ''}
                    name='password'
                    extraClass="mb-6"
                />

                <Input
                    type='text'
                    placeholder={'Введите код из письма'}
                    onChange={handleInputChange}
                    value={formData.secretCode || ''}
                    name='secretCode'
                    extraClass="mb-6"
                />

                <Button htmlType="submit" type="primary" extraClass="mb-20" size="large">Сохранить</Button>
            </form>

            <div className={styles.aditional_actions}>
                <p className="text text_type_main-default text_color_inactive mr-1">Вы — новый пользователь?</p>
                <p className="text text_type_main-default">
                    <Link to='/login' className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    )
}