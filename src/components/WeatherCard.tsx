import React from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherIconUrl } from '../utils/weatherApi';
import { Droplets, Wind, Gauge, Eye, MapPin } from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  // Mock additional data for demonstration (in a real app, you'd get this from the API)
  const pressure = 1009; // hPa
  const visibility = 10; // km

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl">
        {/* Location and Temperature */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
          </div>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <img
              src={getWeatherIconUrl(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="w-20 h-20"
            />
            <div className="text-8xl font-bold text-white">
              {Math.round(weatherData.main.temp)}°C
            </div>
          </div>
          
          <div className="text-2xl text-white/90 capitalize mb-2">
            {weatherData.weather[0].description}
          </div>
          <div className="text-lg text-white/70">
            Feels like {Math.round(weatherData.main.feels_like)}°C
          </div>
        </div>

        {/* Weather Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Humidity */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {weatherData.main.humidity}%
            </div>
            <div className="text-white/70 text-sm font-medium">
              Humidity
            </div>
          </div>

          {/* Wind Speed */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Wind className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {weatherData.wind.speed} m/s
            </div>
            <div className="text-white/70 text-sm font-medium">
              Wind Speed
            </div>
          </div>

          {/* Pressure */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Gauge className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {pressure} hPa
            </div>
            <div className="text-white/70 text-sm font-medium">
              Pressure
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Eye className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {visibility} km
            </div>
            <div className="text-white/70 text-sm font-medium">
              Visibility
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};