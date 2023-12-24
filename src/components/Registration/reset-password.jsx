
import styles from './registration.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm'
import { useLazyPasswordResetResetQuery } from '../../hooks/useApi'

export function ResetPassword() {

    const { formData, handleInputChange } = useForm({
        secretCode: '',
        password: '',
    }, (formData) => console.log(formData));
    const navigate = useNavigate();
    const [trigger, { isLoading, isError, data, error }] = useLazyPasswordResetResetQuery();

    useEffect(() => {
        if (data && data.success)
        {
            localStorage.removeItem("fromForgotPassword");
            navigate('/login');
        }
    }, [data])

    const onSubmit = (e) => {
        e.preventDefault();
        trigger({ password: formData.password, token: formData.secretCode});
    }

    return localStorage.getItem("fromForgotPassword") === null && <Navigate to='/'></Navigate>
        || (
            <div className={styles.layout}>

                <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={handleInputChange}
                    value={formData.password}
                    name={'password'}
                    extraClass="mb-6"
                />

                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleInputChange}
                    value={formData.secretCode}
                    name={'secretCode'}
                    extraClass="mb-6"
                />

                <Button htmlType="button" type="primary" extraClass="mb-20" size="large" onClick={(e) => onSubmit(e)}>Сохранить</Button>

                <div className={styles.aditional_actions}>
                    <p className="text text_type_main-default text_color_inactive mr-1">Вы — новый пользователь?</p>
                    <p className='text text_type_main-default'>
                        <Link to='/login' className={styles.link}>Войти</Link>
                    </p>
                </div>
            </div>
        )

}