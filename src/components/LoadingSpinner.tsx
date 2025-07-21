import { Cloud } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative">
        <Cloud className="h-12 w-12 text-primary animate-pulse" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-muted-foreground animate-pulse">Fetching weather data...</p>
    </div>
  );
};