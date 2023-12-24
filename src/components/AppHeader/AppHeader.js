import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';
import { useCallback } from 'react'

function AppHeader(props) {

  const renderNavLink = useCallback((to, caption) => {
    return (
      <NavLink to={to} className={({ isActive }) => isActive ? styles.nav_link_name_acitve : styles.nav_link_name}>
        {({ isActive }) => {
          return isActive ?
            (<div className={styles.nav_link}>
              {to === '/' ? <BurgerIcon type='primary' /> : to === '/orderfeed' ? <ListIcon type='primary' /> : <ProfileIcon type='primary' />}
              <p className="text text_type_main-small">{caption}</p>
            </div>)
            : (<div className={styles.nav_link}>
              {to === '/' ? <BurgerIcon type='secondary' /> : to === '/orderfeed' ? <ListIcon type='secondary' /> : <ProfileIcon type='secondary' />}
              <p className="text text_type_main-small">{caption}</p>
            </div>)
        }}
      </NavLink>
    )
  }, [])

  return (
    <header className={styles.content}>
      <div className={styles.nav_link}>
        {renderNavLink('/', 'Конструктор')}
      </div>

      <div className={styles.nav_link}>
        {renderNavLink('/orderfeed', 'Лента заказов')}
      </div>

      <Logo />

      <div className={styles.nav_link_last}>
        {renderNavLink('/profile', 'Личный кабинет')}
      </div>

    </header>
  );
}

export default AppHeader;