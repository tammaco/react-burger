import styles from './IngredientDetails.module.css';
import { useGetIngredientsQuery } from '../../hooks/useApi'
import { useParams } from 'react-router-dom';

function IngredientDetails(props) {
    //const { ingredient, setIngredient } = useState(null);
    const { data: ingredients } = useGetIngredientsQuery();
    const { ingredientId } = useParams();

    let ingredient = ingredients.filter(x => x._id === ingredientId)[0]
   
    return (ingredient && <div className={styles.content}>
        <img src={ingredient.image_large} alt={ingredient.name}></img>
        <div className={styles.ingredient_name}>
            <p className="text text_type_main-medium">{ingredient.name}</p>
        </div>
        <div className={styles.nutrition_values}>
            <div className={styles.value}>
                <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
            </div>
            <div className={styles.value}>
                <p className="text text_type_main-small text_color_inactive">Белки,г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
            </div>
            <div className={styles.value}>
                <p className="text text_type_main-small text_color_inactive">Жиры,г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
            </div>
            <div className={styles.value}>
                <p className="text text_type_main-small text_color_inactive">Углеводы,г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
            </div>
        </div>
    </div>)
}

export default IngredientDetails;