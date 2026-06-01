import axios from 'axios';

const API_URL = 'https://meteoflow-api.onrender.com/api/weather'


export const getWeatherData = async () => {
    try{
        const response = await axios.get(API_URL);
        return response.data;

    }catch(error){
        console.error("Weather API Error:", error);
        return [];
    }
};