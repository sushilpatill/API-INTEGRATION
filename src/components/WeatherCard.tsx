import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Snowflake, Wind, Droplets, Eye, Gauge } from "lucide-react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className="h-16 w-16 text-weather-sunny" />;
    case 'clouds':
      return <Cloud className="h-16 w-16 text-weather-cloudy" />;
    case 'rain':
      return <CloudRain className="h-16 w-16 text-weather-rainy" />;
    case 'snow':
      return <Snowflake className="h-16 w-16 text-weather-snowy" />;
    default:
      return <Sun className="h-16 w-16 text-weather-sunny" />;
  }
};

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const condition = weather.weather[0].main;
  const description = weather.weather[0].description;

  return (
    <Card className="p-8 backdrop-blur-md bg-card/80 border-border/20 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{weather.name}</h2>
          <Badge variant="secondary" className="capitalize">
            {description}
          </Badge>
        </div>
        {getWeatherIcon(condition)}
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <p className="text-5xl font-bold text-primary">{temp}°</p>
          <p className="text-muted-foreground">Temperature</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-accent">{feelsLike}°</p>
          <p className="text-muted-foreground">Feels like</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Wind className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold">{weather.wind.speed} m/s</p>
            <p className="text-xs text-muted-foreground">Wind</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Droplets className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold">{weather.main.humidity}%</p>
            <p className="text-xs text-muted-foreground">Humidity</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Eye className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
            <p className="text-xs text-muted-foreground">Visibility</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Gauge className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold">{weather.main.pressure} hPa</p>
            <p className="text-xs text-muted-foreground">Pressure</p>
          </div>
        </div>
      </div>
    </Card>
  );
};