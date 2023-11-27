import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import { IngredientsContext } from '../../services/appContext'
import { apiurl } from '../../services/api'

function App() {

  const [data, setData] = useState(null);

  const getData = () => {
    
    fetch(apiurl + 'ingredients')
      .then(res =>
        {
          if (res.ok) 
              return res.json();
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => {
          if (data.success && data.data !== null && data.data.length)
            setData(data.data);
          else
            console.log("Неудачная попытка получения ингредиентов");
        })
        .catch(e => {
          console.log("error", e);
        });
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
