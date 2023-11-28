import React from 'react'

import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientsContext } from '../../services/appContext'
import IngredientItem from '../IngredientItem/IngredientItem'

function BurgerIngredients(props) {

  const [current, setCurrent] = React.useState('bun');
  const ingredients = React.useContext(IngredientsContext);

  const tabs = [
    { id: 1, name: "Булки", type: 'bun' },
    { id: 2, name: "Соусы", type: 'sauce' },
    { id: 3, name: "Начинки", type: 'main' }
  ];

  return (
    <section className={styles.layout}>
        <div className={styles.title}>
          <p className="text text_type_main-large">Соберите бургер</p>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <Tab value={tab.type} key={tab.id} active={current === tab.type} onClick={setCurrent}>
              <p className="text text_type_main-small">{tab.name}</p>
            </Tab>
          ))}
        </div>
        <div className={styles.ingredients}>
        {
          ingredients
           && (
            <>
              {
                tabs.map((tab, index) => (
                  <div key={index}>
                    <div className='pt-10'>
                      <p className="text text_type_main-medium">{tab.name}</p>
                    </div>
                    <div className={styles.columns}>
                      {
                        ingredients.filter(item => item.type === tab.type)
                          .map((item, index) => 
                          <div className={index % 2 === 0 ? 'pl-4' : 'pl-6'} key={item._id}>
                            <IngredientItem item={item} />
                          </div>
                          )
                      }
                    </div>
                  </div>
                ))
              }
            </>
           )
        }
         </div>
    </section>
  )
}

export default BurgerIngredients;