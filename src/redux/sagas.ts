import { put, takeEvery, call, delay } from 'redux-saga/effects';
import { fetchWeatherByLocation } from '../services/weather';
import { setWeatherData, setError, setLocation } from './slice';
import { select } from 'redux-saga/effects';

interface FetchWeatherDataAction {
  type: string;
  payload: string;
}

function* fetchWeatherData(
  action: FetchWeatherDataAction,
): Generator<unknown, void, unknown> {
  try {
    const data = yield call(fetchWeatherByLocation, action.payload);
    if (data === null) {
      yield put(setError('Error fetching weather data.'));
    } else {
      yield put(setWeatherData(data as WeatherType));
    }
  } catch (error) {
    console.error('Error while fetching weather data:', error);
    yield put(setError('Error fetching weather data.'));
  }
}

function* watchFetchWeatherData(): Generator<unknown, void, unknown> {
  yield takeEvery('weather/setLocation', fetchWeatherData);
}

function* updateWeatherDataPeriodically(): Generator<unknown, void, unknown> {
  while (true) {
    const selectedLocation = yield select(
      (state) => state.weather.selectedLocation,
    );
    yield put(setLocation(selectedLocation as string));
    yield delay(15 * 60 * 10);
  }
}

export default function* rootSaga(): Generator<unknown, void, unknown> {
  yield watchFetchWeatherData();
  yield updateWeatherDataPeriodically();
}
