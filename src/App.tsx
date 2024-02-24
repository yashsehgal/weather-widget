import './App.css';
import WeatherCard from './components/weather-card';
import { WidgetWrapper } from './components/widget-wrapper';

export default function App() {
  return <div className="app">
    <WidgetWrapper>
      <WeatherCard />
    </WidgetWrapper>
  </div>
}