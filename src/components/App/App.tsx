import AppHeader from '../AppHeader/AppHeader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Home from '../../pages/home/home'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

import Modal from '../Modal/Modal'
import { Profile } from '../Profile/index'
import { ProfileEdit } from '../Profile/profile-edit'
import { OrderFeed } from '../OrderFeed/order-feed'

import { NotFound404 } from '../../pages/not-found/not-found'
import { Login } from '../../pages/registration/login'
import { Register } from '../../pages/registration/register'
import { ForgotPassword } from '../../pages/registration/forgot-password'
import { ResetPassword } from '../../pages/registration/reset-password'

import { Loading } from '../loading';

import { Routes, Route, useLocation, useNavigate, useMatch, useParams } from 'react-router-dom';

import { useGetIngredientsQuery } from '../../hooks/useApi'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkUserAuth } from '../../services/slices/userSlice'

import { OnlyUnAuth, OnlyAuth } from '../protected-route'
import { Feed } from '../Feed/feed';
import { OrderInfo } from '../OrderInfo/order-info';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const matchFeed = useMatch('/feed/:number');
  const matchOrder = useMatch('/profile/orders/:number');

  const { isLoading: loading, error } = useGetIngredientsQuery(null);

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [])

  if (loading)
    return <Loading isLoading={true} />

  if (!loading && error)
    return <Loading isLoading={false} isError={true} />

  return (
    <ErrorBoundary>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        <Route path="/" element={<Home />} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
        <Route path="*" element={<NotFound404 />} />

        <Route path="/profile" element={<OnlyAuth element={<Profile />} />}>
          <Route index element={<ProfileEdit />} />
          <Route path="" element={<ProfileEdit />} />
          <Route path="orders" element={<OrderFeed />} />
          <Route path="orders/:number" element={<OrderInfo />} />
        </Route>

        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderInfo />} />

        <Route path="/login" element={<OnlyUnAuth element={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth element={<Register />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth element={<ResetPassword />} />} />

      </Routes>

      {background && (
        
        <Routes>
          <Route path='/ingredients/:ingredientId' element={
            <Modal onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
          />

          <Route path='/feed/:number' element={
            <Modal onClose={handleModalClose} header={'# ' + matchFeed?.params.number}>
              <OrderInfo />
            </Modal>
          }
          />

          <Route path='/profile/orders/:number' element={
            <Modal onClose={handleModalClose} header={'# ' + matchOrder?.params.number}>
              <OrderInfo />
            </Modal>
          }
          />
        </Routes>
      )}

    </ErrorBoundary>
  );
}

export default App;
