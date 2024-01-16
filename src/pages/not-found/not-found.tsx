import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export function NotFound404(): React.JSX.Element {
    return (<div className={styles.layout}>
        <p className="text text_type_main-large">Oops! 404 Error</p>
        <p className="text text_type_main-small">The page you requested does not exist</p>
        <br />
        <br />
        <p className="text text_type_main-small">check the address or try <Link to='/'>homepage</Link></p>
    </div>)
}