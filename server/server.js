import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API server is running' });
});

// Weather endpoint
app.post('/api/weather', async (req, res) => {
  try {
    const { city, langCode = 'en' } = req.body;

    if (!API_KEY) {
      return res.status(500).json({ 
        error: 'Weather API key is not configured' 
      });
    }

    if (!city || !city.trim()) {
      return res.status(400).json({ 
        error: 'City name is required' 
      });
    }

    const url = `${BASE_URL}?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&lang=${langCode}&units=metric`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod === '404' || data.cod === 404) {
      return res.status(404).json({ 
        error: `City "${city}" not found. Please check the city name.` 
      });
    }
    
    if (data.cod !== 200) {
      return res.status(500).json({ 
        error: 'Failed to fetch weather data. Please try again.' 
      });
    }
    
    res.json(data);

  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌦️  Weather API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Weather API: http://localhost:${PORT}/api/weather`);
});