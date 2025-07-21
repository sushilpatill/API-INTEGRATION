import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, onLocationRequest, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter city name (e.g., London, New York, Tokyo)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 bg-card/80 border-border/20 backdrop-blur-md"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!city.trim() || isLoading}
          className="bg-primary hover:bg-primary/90"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onLocationRequest}
          disabled={isLoading}
          className="bg-card/80 border-border/20 backdrop-blur-md hover:bg-muted/50"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </form>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Search for any city or use your current location
      </p>
    </div>
  );
};