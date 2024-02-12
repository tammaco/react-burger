import moment from "moment";
import styles from './order-create-at.module.css';

export function OrderCreateAt({createdAt} : { createdAt: Date }): React.JSX.Element {
    const dayDiff: number = moment.duration(moment().endOf('day').diff(moment(createdAt))).days();
    const dayDiffDiv = dayDiff % 10;
    let dateText = '';
    switch (dayDiff) {
        case 0:
            dateText = 'Сегодня'
            break;
        case 1:
            dateText = 'Вчера'
            break;
        default:
            dateText = dayDiff + ' ' +  
                (dayDiff >= 11 && dayDiff <= 14 || dayDiffDiv === 0 || dayDiffDiv >= 5 && dayDiffDiv <= 19 ? 'дней' :  dayDiffDiv >= 2 && dayDiffDiv <= 4 ? 'дня' : 'день') 
                + ' назад'
      }
      dateText += ', ' + moment(createdAt).format('HH:mm')

    return (
        <p className={`${styles.right} text text_type_main-default text_color_inactive mr-2`}>
            {dateText}
        </p>
    )
}