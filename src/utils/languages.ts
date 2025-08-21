import languageData from '../data/languages.json';
import { Language } from '../types/weather';

export const getLanguages = (): Language[] => {
  return Object.entries(languageData).map(([name, code]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    code
  }));
};

export const getLanguageCode = (languageName: string): string => {
  const languages = languageData as Record<string, string>;
  return languages[languageName.toLowerCase()] || 'en';
};