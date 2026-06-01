import { useState, useEffect } from 'react';
import { getWeatherData } from './services/weatherAPI';
import CurrentWeatherReading from './components/weatherReading';
import WeatherChart from './components/weatherChart';
import HistoricalExtremes from './components/historicalExtremes';
import './index.css';

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loadWeatherData, setloadWeatherData] = useState(true);
  const [range, setRange] = useState('all');

  useEffect(() => {
    // Llamamos a la función limpia que extrajimos al archivo api.js
    getWeatherData().then(weatherdata_response => {
      console.log("Datos recibidos en App.jsx:", weatherdata_response.data);
      setWeatherData(weatherdata_response.data);
      setloadWeatherData(false);
    });
  }, []);

  // Logic for filtering data 
  const FilterData = weatherData.filter(registro => {
    console.log("Filtrando registro:", registro);
    if (range === 'all') return true;

    const hour = new Date();
    const registerDate = new Date(registro.time);
    
    // Calculamos las horas transcurridas desde el registro hasta hoy
    const pastHours = (hour - registerDate) / (1000 * 60 * 60);

    if (range === '24h') {
      return pastHours >= 0 && pastHours <= 24; 
    }
    if (range === '7d') {
      return pastHours >= 0 && pastHours <= 168; // 24 horas * 7 días
    }
    
    return true;
  });


return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
          MeteoFlow Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Pipeline automatizado desde Supabase</p>
      </header>

      {loadWeatherData ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl animate-pulse text-emerald-500">Descargando registros...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Tarjeta lateral */}
          <div className="lg:col-span-1">
            <CurrentWeatherReading weatherData={weatherData[0]} />
          </div>

          {/* Panel Analítico Central */}
          <div className="lg:col-span-3 flex flex-col">
            
            {/* Cabecera del Panel Analítico con Botones */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-sm uppercase tracking-widest text-slate-400">
                Análisis de Tendencias
              </h2>
              
              {/* Controles de Filtrado */}
              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button 
                  onClick={() => setRange('24h')}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === '24h' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  Últimas 24h
                </button>
                <button 
                  onClick={() => setRange('7d')}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === '7d' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  Últimos 7 Días
                </button>
                <button 
                  onClick={() => setRange('all')}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === 'all' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  Historial Completo
                </button>
              </div>
            </div>

            {/* Tarjetas de Extremos (Máx, Mín, Promedio) */}
            <HistoricalExtremes weatherData={FilterData} />

            {/* La Gráfica alimentada por los datos filtrados */}
            <WeatherChart weatherData={FilterData} />
            
          </div>
        </div>
      )}
    </div>
  );
}