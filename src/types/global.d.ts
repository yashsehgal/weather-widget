declare type WeatherType = {
  location: string;
  humidity: number;
  cloud: number;
  windDirection: string;
  temp: number;
  condition: {
    text: string;
    icon: string;
  };
};
