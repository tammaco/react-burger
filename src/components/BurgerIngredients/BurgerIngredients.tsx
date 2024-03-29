import { useState, useRef, useCallback, useEffect, ForwardedRef } from 'react'

import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import IngredientGroup from '../IngredientGroup/IngredientGroup'

import { useGetIngredientsQuery } from '../../hooks/useApi'

function BurgerIngredients(): React.JSX.Element {
  const [current, setCurrent] = useState('bun');
  const [tabsRefOffSetTop, setTabsRefOffSetTop] = useState(0);

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const bunRef: ForwardedRef<HTMLDivElement> = useRef(null);
  const sauceRef: ForwardedRef<HTMLDivElement> = useRef(null);
  const mainRef: ForwardedRef<HTMLDivElement> = useRef(null);

  const { data: ingredients } = useGetIngredientsQuery(null);

  interface ITab {
    id: number,
    name: string,
    type: string,
  }

  const tabs: ReadonlyArray<ITab> = [
    { id: 1, name: "Булки", type: 'bun' },
    { id: 2, name: "Соусы", type: 'sauce' },
    { id: 3, name: "Начинки", type: 'main' }
  ];

  useEffect(() => { setTabsRefOffSetTop(tabsRef?.current?.offsetTop || 0) }, [tabsRef])

  const scrollHandler = useCallback(() => {
    if (bunRef?.current && sauceRef?.current && mainRef?.current) {
      const tabsTopArray = [
        { tab: 'bun', y: Math.abs(bunRef.current.getBoundingClientRect().y) },
        { tab: 'sauce', y: Math.abs(sauceRef.current.getBoundingClientRect().y) },
        { tab: 'main', y: Math.abs(mainRef.current.getBoundingClientRect().y) }
      ];
      const closestTab = tabsTopArray.reduce(function (a, b) {
        return (a.y < b.y ? a : b);
      });
      setCurrent(closestTab.tab);
    }
  }, []);

  const tabClickHandler = useCallback((value: string) => {
    let top = 0;
    switch (value) {
      case 'bun': top = !bunRef.current ? 0 : Math.abs(tabsRefOffSetTop - bunRef.current.offsetTop); break;
      case 'sauce': top = !sauceRef.current ? 0 : Math.abs(tabsRefOffSetTop - sauceRef.current.offsetTop); break;
      case 'main': top = !mainRef.current ? 0 : Math.abs(tabsRefOffSetTop - mainRef.current.offsetTop); break;
      default: top = 0;
    }
    if (tabsRef.current)
      tabsRef.current.scroll({ top: top, behavior: "smooth" });
    setCurrent(value);
  }, [tabsRefOffSetTop]);


  const renderTab = useCallback((tab: ITab) => {
    return (
      <Tab value={tab.type} key={tab.id} active={current === tab.type} onClick={tabClickHandler}>
        <p className="text text_type_main-small">{tab.name}</p>
      </Tab>
    )
  }, [current]);

  return (
    <section className={styles.layout}>
      <div className={styles.title}>
        <p className="text text_type_main-large">Соберите бургер</p>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => renderTab(tab))}
      </div>

      <div className={styles.ingredients} id='scroll-container' onScroll={scrollHandler} ref={tabsRef}>
        {
          ingredients && Array.isArray(ingredients) && <>
            <IngredientGroup ref={bunRef}
              tabName='Булки' items={ingredients.filter((item) => item.type === 'bun')}>
            </IngredientGroup>
            <IngredientGroup ref={sauceRef}
              tabName='Соусы' items={ingredients.filter((item) => item.type === 'sauce')}>
            </IngredientGroup>
            <IngredientGroup ref={mainRef}
              tabName='Начинки' items={ingredients.filter((item) => item.type === 'main')}>
            </IngredientGroup>
          </>
        }


      </div>
    </section>
  )
}

export default BurgerIngredients;