import styles from './home.module.css';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Home() {

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main_content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </>
  );
}

export default Home;