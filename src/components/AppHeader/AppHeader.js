import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './AppHeader.module.css';

function AppHeader(props) {

  return (
        <section className={styles.layout}>
         <div className={styles.content}>
          
          <div className={styles.nav_link} >
            <BurgerIcon type="primary"/>
            <div className={styles.nav_link_name_acitve}>
              <p className="text text_type_main-small">Конструктор</p>
            </div>
          </div>

          <div className={styles.nav_link} value='orders'> 
            <ListIcon type="secondary"/>
            <div className={styles.nav_link_name}>
              <p className="text text_type_main-small">Лента заказов</p>
            </div>
          </div>
          
          <Logo/>  

          <div className={styles.nav_link} value='profile' style={{left: '1273px', position: 'absolute'}}>
            <ProfileIcon type="secondary"/>
            <div className={styles.nav_link_name}>
              <p className="text text_type_main-small">Личный кабинет</p>
            </div>
          </div>

         </div>
        </section>
      );
    }

  export default AppHeader;