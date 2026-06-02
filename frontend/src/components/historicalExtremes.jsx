export default function HistoricalExtremes({ weatherData }) {
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-center shadow-md mb-6 h-24">
        <p className="text-slate-500">Waiting for data in this time range...</p>
      </div>
    );
  }

  let maxTemp = -Infinity;
  let minTemp = Infinity;
  let maxTime = '';
  let minTime = '';
  let maxWind = -Infinity;
  let maxWindTime = '';
  let sumhumidity = 0;

  weatherData.forEach(registro => {
    const temp = registro.temperature_2m;
    const hum = Number(registro.relativehumidity_2m);
    const wind = Number(registro.windspeed_10m);

    if (temp > maxTemp) {
      maxTemp = temp;
      maxTime = registro.time;
    }
    if (temp < minTemp) {
      minTemp = temp;
      minTime = registro.time;
    }

    if (wind > maxWind) {
      maxWind = wind;
      maxWindTime = registro.time;
    }

    sumhumidity += hum;
  });

  const avgHum = Math.round(sumhumidity / weatherData.length);

  const FormatDate = (stringDate) => {
    const date = new Date(stringDate);
    const hour = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: true });
    const day = date.toLocaleDateString(navigator.language, { weekday: 'short', day: '2-digit', month: 'short', });
    return `${hour} el ${day}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Maximum Temperature */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center shadow-md">
        <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Maximum Temperature</span>
        <span className="text-3xl text-red-400 font-bold">{maxTemp.toFixed(1)}°C</span>
        <span className="text-xs text-slate-400 mt-2">Registered at {FormatDate(maxTime)}</span>
      </div>

      {/* Minimum Temperature */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center shadow-md">
        <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Minimum Temperature</span>
        <span className="text-3xl text-blue-400 font-bold">{minTemp.toFixed(1)}°C</span>
        <span className="text-xs text-slate-400 mt-2">Registered at {FormatDate(minTime)}</span>
      </div>

      {/* Wind Speed */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
        <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Maximum Wind Speed</span>
        <span className="text-3xl text-orange-400 font-bold">{maxWind.toFixed(1)} m/s</span>
        <span className="text-xs text-slate-400 mt-2">Registered at {FormatDate(maxWindTime)}</span>
      </div>

      {/* Average humidity */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
        <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Average humidity</span>
        <span className="text-3xl text-emerald-400 font-bold">{avgHum}%</span>
        <span className="text-xs text-slate-400 mt-2">In the selected period</span>
      </div>


    </div>
  );
}