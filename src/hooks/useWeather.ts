import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

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

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Using OpenWeatherMap API (you'll need to sign up for a free API key)
  const API_KEY = 'demo_key'; // Replace with actual API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeatherByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll use mock data
      // In production, replace this with actual API calls
      const mockWeatherData: WeatherData = {
        name: city,
        main: {
          temp: Math.floor(Math.random() * 30) + 5, // 5-35°C
          feels_like: Math.floor(Math.random() * 30) + 5,
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          pressure: Math.floor(Math.random() * 100) + 1000, // 1000-1100 hPa
        },
        weather: [{
          main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
          description: ['sunny', 'partly cloudy', 'light rain'][Math.floor(Math.random() * 3)]
        }],
        wind: {
          speed: Math.floor(Math.random() * 10) + 1 // 1-10 m/s
        },
        visibility: Math.floor(Math.random() * 5000) + 5000 // 5-10km
      };

      const mockForecastData: ForecastItem[] = Array.from({ length: 40 }, (_, i) => ({
        dt: Date.now() + i * 3 * 60 * 60 * 1000, // Every 3 hours
        main: {
          temp: Math.floor(Math.random() * 25) + 5,
          temp_min: Math.floor(Math.random() * 20) + 2,
          temp_max: Math.floor(Math.random() * 30) + 10,
        },
        weather: [{
          main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
          description: ['sunny', 'partly cloudy', 'light rain'][Math.floor(Math.random() * 3)]
        }],
        dt_txt: new Date(Date.now() + i * 3 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19)
      }));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setWeather(mockWeatherData);
      setForecast(mockForecastData);
      
      toast({
        title: "Weather updated",
        description: `Showing weather data for ${city}`,
      });

      // In production, use this instead:
      /*
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Weather data not found');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData.list);
      */
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data for demo - replace with actual API call
      await fetchWeatherByCity('Your Location');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [fetchWeatherByCity, toast]);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by this browser",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setLoading(false);
        toast({
          title: "Location error",
          description: "Unable to get your location. Please enter a city name.",
          variant: "destructive",
        });
      }
    );
  }, [fetchWeatherByCoords, toast]);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    getCurrentLocation,
  };
};