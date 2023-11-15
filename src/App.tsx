import React, { useState, useEffect } from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'

const apiurl = 'https://norma.nomoreparties.space/api/'

function App() {

  const [data, setData] = useState(null);
  const getData = () => {
    
    fetch(apiurl + 'ingredients')
      .then(res => res.json())
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
    <>
      <AppHeader />
      <div className='main_content'>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
    </>
  );
}

export default App;
