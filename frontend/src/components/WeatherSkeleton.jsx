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