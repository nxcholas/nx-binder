function BinderAnalyticsCard({ value, icon, label, type }) {
  const cardLabels = ["Net Worth", "Total Cards", ""];

  return (
    <>
      <div className="w-full h-[150px] flex flex-col bg-gray-800 rounded-xl">
        <div className="w-full p-4 flex justify-center items-center gap-1">
          {icon}
          <p className="font-semibold">{label}</p>
        </div>
        <div className="w-full h-full p-4">
          <div className="w-full h-full bg-gray-700 flex justify-center items-center rounded-xl">
            {type === "currency" && (`$ ${value}`)}
            {type === "num" && value}
          </div>
        </div>
      </div>
    </>
  );
}
export default BinderAnalyticsCard;
