import { Middleware } from 'redux'
import { io, Socket } from 'socket.io-client';
import { SOCKET_BASE_URL } from '../utils/constants';
 
const ordersMiddleware: Middleware = store => {
  let socket: Socket;
 
  return next => action => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;
 
    /*if (orderActions.startConnecting.match(action)) {
      socket = io(SOCKET_BASE_URL);
 
      socket.on('connect', () => {
        store.dispatch(orderActions.connectionEstablished());
        //socket.emit("orders");
      })
    }*/
 
    next(action);
  }
}
 
export default ordersMiddleware;