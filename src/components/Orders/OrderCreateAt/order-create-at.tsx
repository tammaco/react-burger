import moment from "moment";
import styles from './order-create-at.module.css';

export function OrderCreateAt({createdAt} : { createdAt: Date }): React.JSX.Element {
    const dayDiff: number = moment.duration(moment().endOf('day').diff(moment(createdAt))).days();
    let dateText = '';
    switch (dayDiff) {
        case 0:
            dateText = 'Сегодня'
            break;
        case 1:
            dateText = 'Вчера'
            break;
        default:
            dateText = dayDiff + ' дн' + ((dayDiff < 5 || dayDiff % 10 < 5) && dayDiff % 10 != 0  ? 'я' : 'ей') + ' назад'
      }
      dateText += ', ' + moment(createdAt).format('HH:mm')

    return (
        <p className={`${styles.right} text text_type_main-default text_color_inactive mr-2`}>
            {dateText}
        </p>
    )
}