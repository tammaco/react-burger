import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

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
