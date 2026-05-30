import pool from '../config/db.js';
class WeatherModel {
    static async getWeatherHistory(limit = 100){
        const query = "SELECT * FROM weather_history ORDER BY time DESC LIMIT $1";
        const result = await pool.query(query,[limit]);
        return result.rows;
    }
}

export default WeatherModel;