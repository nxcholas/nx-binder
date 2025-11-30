export default function CardPriceDifferenceChartSkeleton() {
  return (
    <div className="w-full max-w-md bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-800">
      {/* Title Placeholder */}
      <div className="h-4 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>

      {/* Chart area skeleton */}
      <div className="relative w-full h-56 bg-gray-800 rounded-lg border border-gray-700 p-4 flex flex-col justify-end">
        {/* Y-axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between px-4 py-3 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-gray-700/40"></div>
          ))}
        </div>

        {/* Bars */}
        <div className="flex justify-around items-end h-full">
          {/* Bar 1 */}
          <div className="w-8 bg-gray-700 rounded animate-pulse h-20"></div>

          {/* Bar 2 */}
          <div className="w-8 bg-gray-700 rounded animate-pulse h-32"></div>

          {/* Bar 3 */}
          <div className="w-8 bg-gray-700 rounded animate-pulse h-16"></div>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-around mt-3 text-xs text-gray-600">
        <span>7D</span>
        <span>30D</span>
        <span>Trend</span>
      </div>
    </div>
  );
}
