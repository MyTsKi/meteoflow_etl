export default function CurrentWeatherReading({ weatherData }) {
    if (!weatherData) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-center">
                <p className="text-slate-500 text-sm">Sin datos en la base.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-center">
            <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-6">
                Current Reading
            </h2>

            <div>
                <div className="flex items-start gap-1">
                    <span className="text-7xl font-light text-white">
                        {weatherData.temperature_2m}
                    </span>
                    <span className="text-2xl text-emerald-400 mt-2">°C</span>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800">
                    <p className="text-slate-400 flex justify-between">
                        Relative Humidity <span className="text-blue-400 font-medium">{weatherData.relativehumidity_2m}%</span>
                    </p>
                    <p className="text-slate-400 flex justify-between">
                        Wind Speed <span className="text-emerald-400 font-medium">{weatherData.windspeed_10m} km/h</span>
                    </p>
                </div>
            </div>
        </div>
    );
}