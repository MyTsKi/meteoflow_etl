import WeatherModel from '../models/weatherModel.js';

export const GetWeather = async (req,res) => {
    try{
        const weatherData = await WeatherModel.getWeatherHistory();
        res.status(200).json({
            success: true,
            total_records: weatherData.length,
            data: weatherData
        });
    }catch(error){
        console.error("Controller weather error: ", error);
        res.status(500).json({
            success: false,
            message: "Internal error getting weather data"
        });
    }
};

