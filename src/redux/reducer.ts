import { combineReducers } from 'redux';
import weatherReducer from './slice';

const createRootReducer = () =>
  combineReducers({
    weather: weatherReducer,
  });

export type RootState = ReturnType<typeof createRootReducer>;

export default createRootReducer;
