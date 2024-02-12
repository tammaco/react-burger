import { IIngredientItem } from "../../../utils/types";
import styles from './order-ingredient-img.module.css';

export function OrderIngredientImg({ item } : {item: IIngredientItem }): React.JSX.Element {
    return (
        <div className={styles.illustration}>
            <img className={styles.illustration_img } src={item.image_mobile} alt={item.name}></img>
        </div>
)
}