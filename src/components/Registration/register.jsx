
import styles from './registration.module.css';
import { EmailInput, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm'
import { useLazyRegisterQuery } from '../../hooks/useApi'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

import { setUser, setIsAuthChecked } from '../../services/actions/BurgerConstructor'

export function Register() {
    const { formData, handleInputChange } = useForm({
        userName: '',
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const [trigger, data]  = useLazyRegisterQuery();

    useEffect(() => {
        if (data.isSuccess) {
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accessToken", data.accessToken);
            dispatch(setUser(data.user));
            dispatch(setIsAuthChecked(true));
        }
    }, [data])

    const onSubmit = (e) => {
        e.preventDefault();
        trigger({ email: formData.email, password: formData.password, name: formData.userName });
    }

    return (
        <div className={styles.layout}>

            <p className="text text_type_main-medium mb-6">Вход</p>

            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleInputChange}
                value={formData.userName}
                name={'userName'}
                extraClass="mb-6"
            />

            <EmailInput
                onChange={handleInputChange}
                value={formData.email}
                name={'email'}
                placeholder="Логин"
                extraClass="mb-6"
            />

            <PasswordInput
                onChange={handleInputChange}
                value={formData.password}
                name={'password'}
                extraClass="mb-6"
            />

            <Button htmlType="button" type="primary" extraClass="mb-20" size="large" onClick={(e) => onSubmit(e)}>Зарегистрироваться</Button>

            {data.isError && <p>Ошибка: {data.error?.data?.message}</p>}

            <div className={styles.aditional_actions}>
                <p className="text text_type_main-default text_color_inactive mr-1">Уже зарегистрированы?</p>
                <p className='text text_type_main-default'>
                    <Link to='/login' className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    )
}