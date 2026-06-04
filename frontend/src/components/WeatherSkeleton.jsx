export default function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse w-full">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((tarjeta) => (
          <div key={tarjeta} className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 h-28 flex flex-col items-center justify-center gap-3 shadow-md">
            {/* title */}
            <div className="h-3 bg-slate-800 rounded w-1/2"></div>
            {/* value */}
            <div className="h-7 bg-slate-700 rounded w-1/3"></div>
            {/* date/subtitle */}
            <div className="h-2 bg-slate-800 rounded w-2/3"></div>
          </div>
        ))}
      </div>
      {/* HISTORICAL TREND */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 h-[450px] flex flex-col shadow-xl">
        <div className="h-4 bg-slate-800 rounded w-48 mb-8"></div>

        {/* Graphic */}
        <div className="flex-1 border-b border-l border-slate-800/50 flex items-end p-2 gap-2 sm:gap-4 overflow-hidden relative">
          {/* Líneas horizontales de fondo (Grid lines) */}
          <div className="absolute w-full h-[1px] bg-slate-800/30 bottom-1/4 left-0"></div>
          <div className="absolute w-full h-[1px] bg-slate-800/30 bottom-2/4 left-0"></div>
          <div className="absolute w-full h-[1px] bg-slate-800/30 bottom-3/4 left-0"></div>

          {/* Columns */}
          {[20, 40, 60, 80, 50, 30, 45, 70, 90, 60, 40, 20].map((alto, index) => (
            <div
              key={index}
              className="w-full bg-slate-800/40 rounded-t-sm"
              style={{ height: `${alto}%` }}
            ></div>
          ))}
        </div>
      </div>

    </div>
  );
}

export function LiveWeatherSkeleton() {
  return (
    <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[#0f172a] to-slate-900 border border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden h-auto sm:h-[130px]">
      {/* Title and city */}
      <div className="flex items-center gap-6 w-full sm:w-auto animate-pulse z-10">
        {/* Icon circle */}
        <div className="w-16 h-16 rounded-full bg-slate-800/80"></div>

        <div>
          {/* Small line*/}
          <div className="h-3 w-32 bg-slate-800/80 rounded-full mb-3"></div>
          {/* Big title */}
          <div className="h-6 w-48 bg-slate-700/80 rounded-full"></div>
        </div>
      </div>

      {/* Temperature and wind data*/}
      <div className="flex gap-8 w-full sm:w-auto justify-center animate-pulse z-10">
        <div className="flex flex-col items-center">
          <div className="h-2 w-20 bg-slate-800/80 rounded-full mb-3"></div>
          <div className="h-8 w-16 bg-slate-700/80 rounded-full"></div>
        </div>

        <div className="w-px bg-slate-800 h-12"></div>

        <div className="flex flex-col items-center">
          <div className="h-2 w-20 bg-slate-800/80 rounded-full mb-3"></div>
          <div className="h-8 w-24 bg-slate-700/80 rounded-full"></div>
        </div>
      </div>

    </div>
  )
};