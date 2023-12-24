
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useForm } from '../../hooks/useForm'
import { useLazyUpdateUserQuery } from '../../hooks/useApi'

import { getUser } from '../../services/selectors/BurgerConstructor'
import { setUser } from '../../services/actions/BurgerConstructor'

export function ProfileEdit() {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const { formData, handleInputChange, resetValues, isChange } = useForm({
        email: user.email,
        name: user.name,
        password: '',
    });

    const { email, password, name } = formData;
    const [trigger, { isLoading, isError, data, error }] = useLazyUpdateUserQuery();

    useEffect(() => {
        if (data && data.success) {
            dispatch(setUser(data.user));
            resetValues();
        }
    }, [data, user])


    const cancelEdit = (e) => {
        e.preventDefault();
        resetValues();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        trigger({ email, password, name });
    }

    return (
        <div className={styles.outlet_layout}>
            <div>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleInputChange}
                    value={name}
                    name={'name'}
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={handleInputChange}
                    value={email}
                    name={'email'}
                    placeholder="Логин"
                    extraClass="mb-6"
                />

                <PasswordInput
                    onChange={handleInputChange}
                    value={password}
                    name={'password'}
                    placeholder="Пароль"
                    extraClass="mb-6"
                />
            </div>
            {isChange && (<div className={styles.aditional_actions}>
                <Button htmlType="button" type="secondary" extraClass="mb-20" size="medium" onClick={(e) => cancelEdit(e)}>Отмена</Button>
                <Button htmlType="button" type="primary" extraClass="mb-20" size="medium" onClick={(e) => onSubmit(e)}>Сохранить</Button>
            </div>)
            }
        </div>
    )
}