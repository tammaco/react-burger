import { addBun } from '../../services/slices/BurgerConstructor'
import { useDrop } from 'react-dnd'
import PropTypes from 'prop-types';

export default function BunContainer({pos}) {

    const [{ isHover }, refDrop] = useDrop({
        accept: "bun",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            addBun(item);
        },
    });

    return(
        <div className={`constructor-element constructor-element_pos_${pos}`} ref={refDrop}>
            <span className="constructor-element__row"><span className="constructor-element__text">Булка { pos === "top" ? "верх" : "низ"}</span></span>
        </div>
    )
}

BunContainer.propTypes = {
    pos: PropTypes.string.isRequired
};