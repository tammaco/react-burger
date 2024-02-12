
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'

import { FormEvent, SyntheticEvent, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../components/hooks'

import { useForm } from '../../hooks/useForm'
import { useLazyUpdateUserQuery } from '../../hooks/useApi'

import { getUser } from '../../services/selectors/userSelector'
import { setUser } from '../../services/slices/userSlice'

export function ProfileEdit(): JSX.Element {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();

    const { formData, handleInputChange, resetValues, isChange } = useForm({
        email: user ? user.email : undefined,
        name: user ? user.name : undefined,
        password: '',
    });

    const { email, password, name } = formData;
    const [trigger, { data }] = useLazyUpdateUserQuery();

    useEffect(() => {
        if (data && data.success) {
            dispatch(setUser(data.user));
            resetValues();
        }
    }, [data, user])


    const cancelEdit = (e: SyntheticEvent) => {
        e.preventDefault();
        resetValues();
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        trigger({ email, password, name });
    }

    return (
        <div className={styles.outlet_layout}>
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                    type='text'
                    placeholder={'Имя'}
                    onChange={handleInputChange}
                    value={name || ''}
                    name='name'
                    extraClass="mb-6"
                />
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
                    placeholder="Пароль"
                    extraClass="mb-6"
                />

                {isChange && (<div className={styles.aditional_actions}>
                    <Button htmlType="button" type="secondary" extraClass="mb-20" size="medium" onClick={cancelEdit}>Отмена</Button>
                    <Button htmlType="submit" type="primary" extraClass="mb-20" size="medium">Сохранить</Button>
                </div>)
                }
            </form>
        </div>
    )
}