import { Navigate, useLocation } from 'react-router-dom';
import { getUser, getIsAuthChecked } from '../services/selectors/BurgerConstructor'
import { Loading } from '../components/loading';
import { useSelector } from 'react-redux'

const Protected = ({ onlyUnAuth = false, element }) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked)
    return <Loading />;

  if (onlyUnAuth && user != null) {
    const from = location.state?.from || { from: { pathname: '/' } };
    return <Navigate to={from}></Navigate>;
  }

  if (!onlyUnAuth && user === null)
    return <Navigate to='/login' state={{ from: location }}></Navigate>;

  return element;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({element}) => <Protected onlyUnAuth={true} element={element} />