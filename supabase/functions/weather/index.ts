const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface WeatherRequest {
  city: string;
  langCode?: string;
}

const API_KEY = Deno.env.get('OPENWEATHER_API_KEY');
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!API_KEY) {
      return new Response(
        JSON.stringify({ error: "Weather API key is not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { city, langCode = 'en' }: WeatherRequest = await req.json();

    if (!city || !city.trim()) {
      return new Response(
        JSON.stringify({ error: "City name is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const url = `${BASE_URL}?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&lang=${langCode}&units=metric`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod === '404' || data.cod === 404) {
      return new Response(
        JSON.stringify({ error: `City "${city}" not found. Please check the city name.` }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    if (data.cod !== 200) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch weather data. Please try again." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Weather API Error:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});