
import styles from './registration.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { FormEvent, useEffect } from 'react'

import { useForm } from '../../hooks/useForm'
import { useLazyPasswordResetQuery } from '../../hooks/useApi'

import { Link, useNavigate } from 'react-router-dom';

export function ForgotPassword(): React.JSX.Element {
    const { formData, handleInputChange } = useForm({ email: '' });
    const navigate = useNavigate();
    const [trigger, data] = useLazyPasswordResetQuery();

    useEffect(() => {
        if (data && data.data?.success) {
            localStorage.setItem("fromForgotPassword", 'true');
            navigate('/reset-password');
        }
    }, [data])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        trigger({ email: formData.email });
    }

    return (
        <div className={styles.layout}>

            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <form className={styles.form} onSubmit={onSubmit}>
                <EmailInput
                    onChange={handleInputChange}
                    value={formData.email || ''}
                    name={'email'}
                    placeholder="Уажите Email"
                    extraClass="mb-6"
                />

                <Button htmlType="submit" type="primary" extraClass="mb-20" size="large">Восстановить</Button>
            </form>

            <div className={styles.aditional_actions}>
                <p className="text text_type_main-default text_color_inactive mr-1">Вспомнили пароль?</p>
                <p className='text text_type_main-default'>
                    <Link to='/login' className={styles.link}>Войти</Link>
                </p>
            </div>

        </div>
    )
}