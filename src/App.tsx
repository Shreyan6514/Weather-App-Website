import React from 'react';
import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { WeatherCard } from './components/WeatherCard';
import { ErrorMessage } from './components/ErrorMessage';
import { fetchWeatherData } from './utils/weatherApi';
import { getLanguageCode } from './utils/languages';
import { WeatherData } from './types/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string, language: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const langCode = getLanguageCode(language);
      const data = await fetchWeatherData(city, langCode);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setWeatherData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-8">
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      
      {error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}
      
      {weatherData && (
        <>
          <WeatherCard weatherData={weatherData} />
          <div className="w-full max-w-4xl mx-auto px-4 mt-6">
            <button
              onClick={handleRetry}
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 border border-white/20"
            >
              Search Another City
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;