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
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

export default function WeatherChart({ weatherData }) {
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex items-center justify-center">
        <p className="text-slate-600">Waiting for records to plot.</p>
      </div>
    );
  }

  const CronologicalData = [...weatherData].reverse();

  const GraphicData = {
    labels: CronologicalData.map(
      registro => {
        const localDate = new Date(registro.time);
        return localDate.toLocaleDateString(navigator.language, { month: 'short', day: '2-digit' });
      }
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: CronologicalData.map(registro => registro.temperature_2m),
        borderColor: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        tension: 0.4,
        pointHitRadius: 25
      },
      {
        label: 'Relative Humidity (%)',
        data: CronologicalData.map(registro => registro.relativehumidity_2m),
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        tension: 0.4,
        pointHitRadius: 25
      },
      {
        label: 'Wind Speed (km/h)',
        data: CronologicalData.map(registro => registro.windspeed_10m),
        borderColor: '#faa560',
        backgroundColor: 'rgba(250, 165, 96, 0.2)',
        tension: 0.4,
        pointHitRadius: 25
      }
    ],
  };

  const GraphicOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', labels: {
          color: '#94a3b8',
          usePointStyle: true
        },
        onHover: (event) => {
          event.native.target.style.cursor = 'pointer';
        },
        onLeave: (event) => {
          event.native.target.style.cursor = 'default';
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#34d399',
        padding: 12,
        callbacks: {
          title: (tooltipItems) => {
            const indice = tooltipItems[0].dataIndex;

            const originalRegister = CronologicalData[indice];
            const allDate = new Date(originalRegister.time);

            return allDate.toLocaleString(navigator.language, {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        }
      },
    },
    scales: {
      y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
      x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full">
      <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-4">
        Historical Trend
      </h2>
      <div className="h-[350px] w-full">
        <Line data={GraphicData} options={GraphicOptions} />
      </div>
    </div>
  );
}