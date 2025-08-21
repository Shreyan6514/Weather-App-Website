import { WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (
  city: string,
  langCode: string = 'en'
): Promise<WeatherData> => {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&lang=${langCode}&units=metric`;
  
  if (!API_KEY) {
    throw new Error('Weather API key is not configured. Please check your environment variables.');
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.cod === '404' || data.cod === 404) {
    throw new Error(`City "${city}" not found. Please check the city name.`);
  }
  
  if (data.cod !== 200) {
    throw new Error('Failed to fetch weather data. Please try again.');
  }
  
  return data;
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};