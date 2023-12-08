import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useGetIngredientsQuery } from '../../hooks/useApi'

function App() {

  const { isLoading: loading, error } = useGetIngredientsQuery();

  if (loading)
    return <p className="text text_type_main-small">Загрузка ингредиентов...</p>

  if (!loading && error)
    return <p className="text text_type_main-small">Опаньки</p>

  return (
    <ErrorBoundary>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main_content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </ErrorBoundary>
  );
}

export default App;
