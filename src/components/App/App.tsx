import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'

const apiurl = 'https://norma.nomoreparties.space/api/'

function App() {

  const [data, setData] = useState(null);
  const getData = () => {
    
    fetch(apiurl + 'ingredients')
      .then(res =>
        {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => {
        setData(data);
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
      <main className={styles.main_content}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </ErrorBoundary>
  );
}

export default App;
