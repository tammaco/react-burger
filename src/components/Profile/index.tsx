import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../hooks/useApi'
import { setUser } from '../../services/slices/userSlice'

import { MouseEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function Profile(): JSX.Element {
    const [trigger, data] = useLazyLogoutQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && data.data?.success) {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            dispatch(setUser(null));
        }
    }, [data]);

    const logOut = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        trigger(null);
    }

    return (
        <div className={styles.layout}>
            <div className={styles.navigation}>
                <NavLink to='' end className={({ isActive }) => isActive ? styles.link_acitve : styles.link}>
                    <p className="text text text_type_main-default">Профиль</p>
                </NavLink>
                <NavLink to='orders' className={({ isActive }) => isActive ? styles.link_acitve : styles.link}>
                    <p className="text text_type_main-default">История заказов</p>
                </NavLink>
                <NavLink to='' className={styles.link} onClick={(e) => { logOut(e); }}>
                    <p className="text text_type_main-default" >Выход</p>
                </NavLink>
            </div>

            <Outlet />
        </div>
    )
}