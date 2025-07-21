import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Snowflake } from "lucide-react";

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  dt_txt: string;
}

interface ForecastCardProps {
  forecast: ForecastItem[];
}

const getWeatherIcon = (condition: string, size = "h-8 w-8") => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className={`${size} text-weather-sunny`} />;
    case 'clouds':
      return <Cloud className={`${size} text-weather-cloudy`} />;
    case 'rain':
      return <CloudRain className={`${size} text-weather-rainy`} />;
    case 'snow':
      return <Snowflake className={`${size} text-weather-snowy`} />;
    default:
      return <Sun className={`${size} text-weather-sunny`} />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric',
    hour12: true
  });
};

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  // Group forecast by date and take first 5 days
  const dailyForecast = forecast.reduce((acc: { [key: string]: ForecastItem[] }, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const days = Object.keys(dailyForecast).slice(0, 5);

  return (
    <Card className="p-6 backdrop-blur-md bg-card/80 border-border/20 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-foreground">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {days.map((date) => {
          const dayItems = dailyForecast[date];
          const midDayItem = dayItems[Math.floor(dayItems.length / 2)];
          const minTemp = Math.min(...dayItems.map(item => item.main.temp_min));
          const maxTemp = Math.max(...dayItems.map(item => item.main.temp_max));
          
          return (
            <div key={date} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                {getWeatherIcon(midDayItem.weather[0].main)}
                <div>
                  <p className="font-semibold">{formatDate(midDayItem.dt_txt)}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {midDayItem.weather[0].description}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">
                  <span className="text-primary">{Math.round(maxTemp)}°</span>
                  <span className="text-muted-foreground ml-2">{Math.round(minTemp)}°</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Hourly forecast for today */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-lg font-semibold mb-3 text-foreground">Today's Hourly</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {forecast.slice(0, 4).map((item, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-2">
                {formatTime(item.dt_txt)}
              </p>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(item.weather[0].main, "h-6 w-6")}
              </div>
              <p className="font-semibold text-primary">
                {Math.round(item.main.temp)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};