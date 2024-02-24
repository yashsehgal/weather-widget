import { combineReducers } from 'redux';
import weatherReducer from './slice';

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
