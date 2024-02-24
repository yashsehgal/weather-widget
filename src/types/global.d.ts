declare type WeatherType = {
  location: string;
  humidity: number;
  cloud: number;
  windDirection: string;
  condition: {
    text: string;
    icon: string;
  };
};
