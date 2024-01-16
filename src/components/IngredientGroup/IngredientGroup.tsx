import { useCallback } from 'react'
import IngredientItem from '../IngredientItem/IngredientItem'
import styles from './IngredientGroup.module.css';
import { forwardRef } from 'react';
import { IIngredientItem } from '../../utils/types'

interface IIngredientGroupProps {
    items: Array<IIngredientItem>;
    tabName: string;
}

const IngredientGroup = forwardRef<HTMLDivElement, React.PropsWithChildren<IIngredientGroupProps>>((props, ref) => {

    const renderngredientItem = useCallback((item: IIngredientItem, index: number) => {
        return (
            <div className={index % 2 === 0 ? 'pl-4' : 'pl-6'} key={item._id}>
                <IngredientItem item={item} />
            </div>
        )
    }, [])

    return (
        <div ref={ref}>
            <div className='pt-10'>
                <p className="text text_type_main-medium">{props.tabName}</p>
            </div>
            <div className={styles.columns}>
                {props.items.map((item, index) => renderngredientItem(item, index))}
            </div>
        </div>
    )
});

export default IngredientGroup;