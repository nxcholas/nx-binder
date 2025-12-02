import { useState, useEffect } from "react";
import TCGdex from "@tcgdex/sdk";

function RecentlyAdded({ icon, label }) {
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const max = 4;

    user.binder.reverse().map(async (userCard) => {
      const tcgdex = new TCGdex("en");
      const fetchedCard = await tcgdex.card.get(userCard.id);
      const cardName = fetchedCard.name;
      const cardPrice = fetchedCard.pricing.cardmarket.trend || 0;

      setRecentlyAdded((prev) => {
        if (prev.length >= max) return prev; // enforce max here
        return [...prev, { name: cardName, value: cardPrice }];
      });
    });
  }, []);

  const log = () => console.log(recentlyAdded);

  return (
    <div className="w-full flex flex-col bg-gray-800 rounded-xl">
      <div className="w-full p-4 flex justify-center items-center gap-1">
        {icon}
        <p className="font-semibold">{label}</p>
      </div>
      <div className="w-full h-full p-4 flex flex-col gap-2">
        {/* map recent cards here */}
        {recentlyAdded.map((card) => (
          <div className="w-full h-[100px] bg-gray-700 flex justify-between items-center rounded-xl px-4">
            <div className="card-name font-semibold">
              <p>{card.name}</p>
            </div>
            <div className="amount font-bold text-green-400">
              <p>${card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RecentlyAdded;
