import { Navigate, useLocation } from 'react-router-dom';
import { getUser, getIsAuthChecked } from '../services/selectors/BurgerConstructor'
import { Loading } from './loading';
import { useSelector } from 'react-redux'

interface IProtectedProps {
  onlyUnAuth?: boolean;
  element: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, element }: IProtectedProps): JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked)
    return <Loading isLoading={true} />;

  if (onlyUnAuth && user != null) {
    const from = location.state?.from || { from: { pathname: '/' } };
    return <Navigate to={from}></Navigate>;
  }

  if (!onlyUnAuth && user === null)
    return <Navigate to='/login' state={{ from: location }}></Navigate>;

  return element;
}


export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ element }: IProtectedProps) => <Protected onlyUnAuth={true} element={element} />