import React from 'react'
import PropTypes from 'prop-types';

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
                            <IngredientItem data={item} />
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

BurgerIngredients.propTypes = {
  data: PropTypes.shape({
      success: PropTypes.bool,
      data: PropTypes.arrayOf(PropTypes.shape({
              _id: PropTypes.string,
              type: PropTypes.string,
              name: PropTypes.string,
              price: PropTypes.number,
              calories: PropTypes.number,
              carbohydrates: PropTypes.number,
              fat: PropTypes.number,
              proteins: PropTypes.number,
              image: PropTypes.string,
              image_large: PropTypes.string,
              image_mobile: PropTypes.string,
          }))
  })
};

export default BurgerIngredients;