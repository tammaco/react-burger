import { ingredientItem } from '../../utils/types'
import PropTypes from 'prop-types';
import IngredientItem from '../IngredientItem/IngredientItem'
import styles from './IngredientGroup.module.css';
import { forwardRef } from 'react';

// function IngredientGroup ({ items, tabName }){
//     return (
//         <div>
//             <div className='pt-10'>
//                  <p className="text text_type_main-medium">{tabName}</p>
//             </div>
//             <div className={styles.columns}>
//                 {
//                     items.map((item, index) => 
//                           <div className={index % 2 === 0 ? 'pl-4' : 'pl-6'} key={item._id}>
//                             <IngredientItem item={item} />
//                           </div>
//                           )
//                 }
//             </div>
//         </div>
//     )
//   } 

const IngredientGroup = forwardRef((props, ref) => {
    const { items, tabName } = props;
    return (
        <div ref={ref}>
            <div className='pt-10'>
                <p className="text text_type_main-medium">{tabName}</p>
            </div>
            <div className={styles.columns}>
                {
                    items.map((item, index) =>
                        <div className={index % 2 === 0 ? 'pl-4' : 'pl-6'} key={item._id}>
                            <IngredientItem item={item} />
                        </div>
                    )
                }
            </div>
        </div>
    )
});

IngredientGroup.propTypes = {
    items: PropTypes.arrayOf(ingredientItem).isRequired,
    tabName: PropTypes.string.isRequired
};

export default IngredientGroup;