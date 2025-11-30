export default function CardPriceChartSkeleton() {
  return (
    <div className="w-full max-w-md bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-800 flex flex-col gap-4">
      {/* Title */}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold">Card Pricing</h2>

        {/* Optional: last updated timestamp placeholder */}
        <span className="text-gray-500 text-xs">--</span>
      </div>

      {/* Chart container */}
      <div className="w-full h-[250px] bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
        <span className="text-gray-500 text-sm">Chart Loading...</span>
      </div>

      {/* Info row */}
      <div className="w-full flex justify-between text-xs text-gray-500">
        <span>Low</span>
        <span>Avg</span>
        <span>Avg 7d</span>
        <span>Avg 30d</span>
        <span>Trend</span>
      </div>
    </div>
  );
}
