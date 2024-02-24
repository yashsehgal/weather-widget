import { Provider } from 'react-redux';
import './App.css';
import WeatherCard from './components/weather-card';
import { WidgetWrapper } from './components/widget-wrapper';
import store from './redux/store';

export default function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <WidgetWrapper>
          <WeatherCard />
        </WidgetWrapper>
      </Provider>
    </div>
  );
}
