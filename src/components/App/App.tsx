import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import { IngredientsContext } from '../../services/appContext'
import request from '../../utils/request'

function App() {

  const [data, setData] = useState(null);

  const getData = () => {
    request('ingredients', {})
      .then(data => {
        if (data.success && data.data !== null && data.data.length)
          setData(data.data);
        else
          console.error("Неудачная попытка получения ингредиентов");
      }).catch(console.error);
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <ErrorBoundary>
      <AppHeader />
      <IngredientsContext.Provider value={data}>
        <main className={styles.main_content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </IngredientsContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
