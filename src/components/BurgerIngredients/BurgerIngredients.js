import React, { useRef, useEffect } from 'react'

import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import IngredientGroup from '../IngredientGroup/IngredientGroup'

import { useGetIngredientsQuery } from '../../hooks/useApi'

function BurgerIngredients(props) {

  const [current, setCurrent] = React.useState('bun');
  const { data: ingredients = [], isSuccess, isError, isLoading } = useGetIngredientsQuery();

  // const { bunRef } = React.createRef();
  // const { sauceRef } = React.createRef();
  // const { mainRef } = React.createRef();
  const { scrollContainerRef, tabsRef, bunRef, sauceRef, mainRef } = useRef(null);

  const onScrollHandler = (event) => {
    if (tabsRef.current)
      console.log(tabsRef?.current);
    // console.log(bunRef?.current);
    // console.log(sauceRef?.current);
    // console.log(mainRef?.current);
    // console.log(tabRef?.current?.getBoundingClientRect());
    // console.log(tabsRef?.current?.scrollTop);
    // console.log(mainRef?.current?.scrollTop);
  };


  useEffect(() => {
    const container = scrollContainerRef;
    if (container) {
      container.current.addEventListener("scroll", onScrollHandler);
    }
  }, [onScrollHandler]);


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

      <div className={styles.tabs} ref={tabsRef}>
        {tabs.map((tab) => (
          <Tab value={tab.type} key={tab.id} active={current === tab.type} onClick={setCurrent}>
            <p className="text text_type_main-small">{tab.name}</p>
          </Tab>
        ))}
      </div>
      <div className={styles.ingredients} ref={scrollContainerRef}>
        {isError && <p className="text text_type_main-small">Опаньки</p>}
        {isLoading && <p className="text text_type_main-small">Загрузка ингредиентов...</p>}
        {isSuccess
          && (
            <>
              <IngredientGroup ref={bunRef}
                tabName='Булки' items={ingredients.filter(item => item.type === 'bun')}>
              </IngredientGroup>
              <IngredientGroup ref={sauceRef}
                tabName='Соусы' items={ingredients.filter(item => item.type === 'sauce')}>
              </IngredientGroup>
              <IngredientGroup ref={mainRef}
                tabName='Начинки' items={ingredients.filter(item => item.type === 'main')}>
              </IngredientGroup>
              {/* {
                tabs.map((tab, index) => (
                  <div key={index}>
                    <IngredientGroup ref={tab.type === 'bun' ? bunRef : tab.type === 'sauce' ? sauceRef : mainRef} 
                      tabName={tab.name} items={ingredients.filter(item => item.type === tab.type)}>
                    </IngredientGroup>
                  </div>
                ))
              } */}
            </>
          )
        }
      </div>
    </section>
  )
}

export default BurgerIngredients;