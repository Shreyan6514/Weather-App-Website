import { WeatherData } from '../types/weather';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const fetchWeatherData = async (
  city: string,
  langCode: string = 'en'
): Promise<WeatherData> => {
  const apiUrl = `${API_BASE_URL}/api/weather`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      city: city.trim(),
      langCode
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch weather data');
  }

  return data;
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};