import React, { useState } from 'react';
import { Search, MapPin, Globe } from 'lucide-react';
import { getLanguages } from '../utils/languages';

interface SearchFormProps {
  onSearch: (city: string, language: string) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const languages = getLanguages();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim(), selectedLanguage);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-8">Weather App</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
          Get real-time weather information for any city around the world with
          beautiful, multilingual support and stunning visuals.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* City Input */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name (e.g., Warsaw, Mumbai, London, Tokyo)"
              className="w-full pl-12 pr-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-0 focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-500 text-lg font-medium"
              required
            />
          </div>

          {/* Language Selection */}
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-0 focus:ring-0 focus:outline-none text-gray-800 text-lg font-medium appearance-none cursor-pointer"
            >
              <option value="">Choose language (e.g., English, Polish, Hindi)</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.name.toLowerCase()}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Getting Weather...
            </>
          ) : (
            <>
              <Search className="w-6 h-6" />
              Get Weather
            </>
          )}
        </button>
      </form>
    </div>
  );
};