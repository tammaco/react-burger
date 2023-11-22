import React from 'react'
import { ingredientType } from '../../utils/types'

import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


import IngredientItem from '../IngredientItem/IngredientItem'

function BurgerIngredients(props) {

  const [current, setCurrent] = React.useState('bun');
  const ingredients = props.data;

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
           && ingredients.success
           && ingredients.data.length
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
                        ingredients.data.filter(item => item.type === tab.type)
                          .map((item, index) => 
                          <div className={index % 2 === 0 ? 'pl-4' : 'pl-6'} key={item._id}>
                            <IngredientItem>{item}</IngredientItem>
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

BurgerIngredients.propTypes = ingredientType;

export default BurgerIngredients;