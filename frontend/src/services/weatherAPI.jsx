import axios from 'axios';

const LATITUDE = 25.56
const LONGITUDE = -103.50

const API_URL = 'https://meteoflow-api.onrender.com/api/weather'
const LIVE_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true&hourly=precipitation_probability,relativehumidity_2m&forecast_days=1&timezone=auto`


export const getWeatherData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Weather API Error:", error);
        return [];
    }
};


export const getLiveWeather = async () => {
    try {
        const response = await axios.get(LIVE_API_URL);
        const data = response.data;
        const currentHour = new Date().getHours();

        const currentRainProb = data.hourly.precipitation_probability[currentHour];
        const currentHumidity = data.hourly.relativehumidity_2m[currentHour];

        return {
            ...data.current_weather,
            rain_probability: currentRainProb,
            humidity: currentHumidity
        };
    } catch (error) {
        console.error("Live Weather API Error", error);
        return null;
    }
}