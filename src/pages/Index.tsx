import { useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { SearchBar } from "@/components/SearchBar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useWeather } from "@/hooks/useWeather";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Cloud } from "lucide-react";

const Index = () => {
  const { weather, forecast, loading, error, fetchWeatherByCity, getCurrentLocation } = useWeather();

  useEffect(() => {
    // Load default weather for London on initial load
    fetchWeatherByCity('London');
  }, [fetchWeatherByCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-primary/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10 backdrop-blur-md">
              <Cloud className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Weather Dashboard
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get real-time weather information and 5-day forecasts for any city worldwide
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          onSearch={fetchWeatherByCity}
          onLocationRequest={getCurrentLocation}
          isLoading={loading}
        />

        {/* Error State */}
        {error && (
          <Alert className="max-w-2xl mx-auto mb-8 bg-destructive/10 border-destructive/20 backdrop-blur-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Weather Content */}
        {!loading && weather && (
          <div className="grid gap-8 max-w-6xl mx-auto">
            {/* Current Weather */}
            <div className="grid md:grid-cols-1 gap-8">
              <WeatherCard weather={weather} />
            </div>

            {/* Forecast */}
            {forecast.length > 0 && (
              <div className="grid md:grid-cols-1 gap-8">
                <ForecastCard forecast={forecast} />
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border/20">
          <p className="text-sm text-muted-foreground">
            Weather data updates in real-time • Built with React & TypeScript
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
