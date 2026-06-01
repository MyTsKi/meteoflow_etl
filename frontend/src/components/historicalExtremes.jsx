export default function HistoricalExtremes({ weatherData }) {
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-center shadow-md mb-6 h-24">
        <p className="text-slate-500">Esperando datos en este rango de tiempo...</p>
      </div>
    );
  }

  // Variables para encontrar los extremos
  let maxTemp = -Infinity;
  let minTemp = Infinity;
  let maxTime = '';
  let minTime = '';
  let sumhumidity = 0;

  // Recorremos el arreglo una sola vez (O(n)) para máxima eficiencia
  weatherData.forEach(registro => {
    const temp = registro.temperature_2m;
    const hum = Number(registro.relativehumidity_2m);

    if (temp > maxTemp) {
      maxTemp = temp;
      maxTime = registro.time;
    }
    if (temp < minTemp) {
      minTemp = temp;
      minTime = registro.time;
    }
    sumhumidity += hum;
  });

  const avgHum = Math.round(sumhumidity / weatherData.length);

  // Función para formatear la fecha a un formato legible (ej. "14:00 (01/06)")
  const FormatDate = (stringDate) => {
    const date = new Date(stringDate);
    const hour = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString(navigator.language, { day: '2-digit', month: '2-digit' });
    return `${hour} el ${day}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Tarjeta Máxima */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center shadow-md">
        <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Temperatura Máxima</span>
        <span className="text-3xl text-red-400 font-bold">{maxTemp.toFixed(1)}°C</span>
        <span className="text-xs text-slate-400 mt-2">Registrada a las {FormatDate(maxTime)}</span>
      </div>
      
      {/* Tarjeta Mínima */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center shadow-md">
        <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Temperatura Mínima</span>
        <span className="text-3xl text-blue-400 font-bold">{minTemp.toFixed(1)}°C</span>
        <span className="text-xs text-slate-400 mt-2">Registrada a las {FormatDate(minTime)}</span>
      </div>

      {/* Tarjeta Promedio Humedad */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
        <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Humedad Promedio</span>
        <span className="text-3xl text-emerald-400 font-bold">{avgHum}%</span>
        <span className="text-xs text-slate-400 mt-2">En el período seleccionado</span>
      </div>
    </div>
  );
}