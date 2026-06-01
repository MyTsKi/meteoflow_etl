import { useState, useEffect } from 'react';
import { getWeatherData } from './services/weatherAPI';
import CurrentWeatherReading from './components/weatherReading';
import WeatherChart from './components/weatherChart';
import HistoricalExtremes from './components/historicalExtremes';
import WeatherSkeleton from './components/WeatherSkeleton';
import './index.css';

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loadWeatherData, setloadWeatherData] = useState(true);
  const [range, setRange] = useState('all');

  useEffect(() => {
    getWeatherData().then(weatherdata_response => {
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
      <header className="mb-8 border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 tracking-tight">
            MeteoFlow
          </h1>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-medium">
            Automated Weather ETL Pipeline
          </p>
        </div>

        <a
          href="https://github.com/MyTsKi/meteoflow_etl.git"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 bg-[#0f172a] border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-emerald-400 transition-all shadow-sm hover:shadow-emerald-500/10"
        >
          <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span className="text-sm font-semibold">View Source</span>
        </a>
      </header>

      {loadWeatherData ? (
        <WeatherSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* <div className="lg:col-span-1">
            <CurrentWeatherReading weatherData={weatherData[0]} />
          </div> */}

          <div className="lg:col-span-3 flex flex-col">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-sm uppercase tracking-widest text-slate-400">
                Historical Analysis
              </h2>

              {/* Fillters */}
              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setRange('24h')}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === '24h' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  Last 24h
                </button>
                <button
                  onClick={() => setRange('7d')}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === '7d' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => setRange('all')}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === 'all' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  Full History
                </button>
              </div>
            </div>

            <HistoricalExtremes weatherData={FilterData} />

            <WeatherChart weatherData={FilterData} />

          </div>
        </div>
      )}
    </div>
  );
}