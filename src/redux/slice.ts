import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCATIONS } from '../common/constants';
import { fetchWeatherByLocation } from '../services/weather';

interface WeatherState {
  selectedLocation: string | null;
  weatherData: WeatherType | null;
  error: string | null;
}

const initialState: WeatherState = {
  selectedLocation: LOCATIONS[0],
  weatherData: await fetchWeatherByLocation(LOCATIONS[0]),
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
    setWeatherData: (state, action: PayloadAction<WeatherType>) => {
      state.weatherData = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setLocation, setWeatherData, setError } = weatherSlice.actions;

export default weatherSlice.reducer;
