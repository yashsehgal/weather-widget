import { WEATHER_API_KEY, WEATHER_URL } from "../common/env";

export async function fetchWeatherByLocation(location: string): Promise<WeatherType | "error"> {
  if (!location) return "error";

  try {
    const response = await fetch(`${WEATHER_URL}?q=${location}&key=${WEATHER_API_KEY}`);
    const data = await response.json();
    const weatherData: WeatherType = {
      location,
      humidity: data['current']['humidity'] as number,
      cloud: data['current']['cloud'] as number,
      windDirection: data['current']['wind_dir'] as string,
      condition: {
        text: data['current']['condition']['text'] as string,
        icon: data['current']['condition']['icon'].replace('//', '') as string
      }
    }

    return weatherData;
  } catch (error) {
    console.error("Error while fetching weather data for location", location, error);
    return "error";
  }
}