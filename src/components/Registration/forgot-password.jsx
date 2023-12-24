
import styles from './registration.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useEffect } from 'react'

import { useForm } from '../../hooks/useForm'
import { useLazyPasswordResetQuery } from '../../hooks/useApi'

import { Link, useNavigate } from 'react-router-dom';

export function ForgotPassword() {
    const { formData, handleInputChange } = useForm({ email: '' });
    const navigate = useNavigate();
    const [trigger, { isLoading, isError, data, error }] = useLazyPasswordResetQuery();

    useEffect(() => {
        if (data && data.success)
        {
            localStorage.setItem("fromForgotPassword", true);
            navigate('/reset-password');
        }
    }, [data])

    const onSubmit = (e) => {
        e.preventDefault();
        trigger(formData.email);
    }

    return (
        <div className={styles.layout}>

            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

            <EmailInput
                onChange={handleInputChange}
                value={formData.email}
                name={'email'}
                placeholder="Уажите Email"
                extraClass="mb-6"
            />

            <Button htmlType="button" type="primary" extraClass="mb-20" size="large" onClick={(e) => { onSubmit(e) }}>Восстановить</Button>

            <div className={styles.aditional_actions}>
                <p className="text text_type_main-default text_color_inactive mr-1">Вспомнили пароль?</p>
                <p className='text text_type_main-default'>
                    <Link to='/login' className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    )
}