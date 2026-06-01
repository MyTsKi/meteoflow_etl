import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WeatherChart({ weatherData }) {
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex items-center justify-center">
        <p className="text-slate-600">Esperando registros para graficar.</p>
      </div>
    );
  }

  const CronologicalData = [...weatherData].reverse();

  const GraphicData = {
    labels: CronologicalData.map(
      registro => {
        const localDate = new Date(registro.time);
        return localDate.toLocaleTimeString(navigator.language, { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      }
    ),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: CronologicalData.map(registro => registro.temperature_2m),
        borderColor: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        tension: 0.4
      },
      {
        label: 'Humedad (%)',
        data: CronologicalData.map(registro => registro.relativehumidity_2m),
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        tension: 0.4
      }
    ],
  };

  const GraphicOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#94a3b8' } },
    },
    scales: {
      y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
      x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full">
      <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-4">
        Tendencia Histórica
      </h2>
      <div className="h-[350px] w-full">
        <Line data={GraphicData} options={GraphicOptions} />
      </div>
    </div>
  );
}