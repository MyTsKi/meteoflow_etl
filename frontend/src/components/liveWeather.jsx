import { LiveWeatherSkeleton } from "./WeatherSkeleton";

export default function LiveWeather({ liveData }) {

    // Función con iconos SVG Animados Premium
    const getWeatherImage = (weatherCode) => {
        const baseUrl = "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/";

        // Despejado (Sol girando)
        if (weatherCode === 0) return `${baseUrl}day.svg`;

        // Parcialmente nublado (Sol asomándose)
        if (weatherCode >= 1 && weatherCode <= 2) return `${baseUrl}cloudy-day-3.svg`;

        // Nublado (Nubes moviéndose)
        if (weatherCode === 3) return `${baseUrl}cloudy.svg`;

        // Niebla
        if (weatherCode >= 45 && weatherCode <= 48) return `${baseUrl}cloudy.svg`;

        // Lluvia (Gotas cayendo)
        if (weatherCode >= 51 && weatherCode <= 67) return `${baseUrl}rainy-6.svg`;

        // Nieve
        if (weatherCode >= 71 && weatherCode <= 77) return `${baseUrl}snowy-6.svg`;

        // Tormenta (Relámpagos)
        if (weatherCode >= 95) return `${baseUrl}thunder.svg`;

        // Por defecto
        return `${baseUrl}day.svg`;
    };

    if (!liveData) return (
        <LiveWeatherSkeleton />
    );

    return (
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[#0f172a] to-slate-900 border border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <div className="flex items-center gap-6 z-10">
                <div className="w-24 h-24 sm:w-32 sm:h-32 -ml-4 flex items-center justify-center">
                    <img
                        src={getWeatherImage(liveData.weathercode)}
                        alt="Weather Condition"
                        className="w-full h-full object-contain"
                    />
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
                            Current Conditions
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Gómez Palacio, Dgo.</h2>
                </div>
            </div>

            <div className="flex gap-6 z-10 items-center overflow-x-auto">
                <div className="text-center">
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Temp</p>
                    <p className="text-2xl font-bold text-white">{liveData.temperature}°C</p>
                </div>

                <div className="w-px bg-slate-700 h-10"></div>

                <div className="text-center">
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Humidity</p>
                    <p className="text-2xl font-bold text-white">{liveData.humidity}%</p>
                </div>

                <div className="w-px bg-slate-700 h-10"></div>

                <div className="text-center">
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Rain Prob</p>
                    <p className="text-2xl font-bold text-emerald-400">{liveData.rain_probability}%</p>
                </div>

                <div className="w-px bg-slate-700 h-10"></div>

                <div className="text-center">
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Wind</p>
                    <p className="text-2xl font-bold text-white">{liveData.windspeed} <span className="text-xs text-slate-500">km/h</span></p>
                </div>
            </div>

        </div>
    );


}