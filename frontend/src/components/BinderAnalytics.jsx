import BinderAnalyticsCard from "./BinderAnalyticsCard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { useState, useEffect } from "react";
import TCGdex from "@tcgdex/sdk";
import DiversityChart from "./DiversityChart";
import RecentlyAdded from "./RecentlyAdded";

function BinderAnalytics() {
  // states
  const [networth, setNetWorth] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  // init
  const user = JSON.parse(localStorage.getItem("user"));

  // compute values here
  // net worth
  useEffect(() => {
    user.binder.forEach((userCard) => {
      async function calculateNetWorth() {
        const tcgdex = new TCGdex("en");

        const prices = await Promise.all(
          user.binder.map(async (userCard) => {
            const fetchedCard = await tcgdex.card.get(userCard.id);
            return fetchedCard.pricing.cardmarket.trend || 0;
          })
        );
        const total = prices.reduce((sum, p) => sum + p, 0);
        setNetWorth(total);
      }
      calculateNetWorth();
    });
  }, []);

  // total cards
  useEffect(() => {
    const totalCards = user.binder.length;
    setTotalCards(totalCards);
  });

  return (
    <div className="min-h-screen">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 min-h-[30%]">
        <BinderAnalyticsCard
          icon={<AttachMoneyIcon />}
          value={networth}
          label={"Net Worth"}
          type={"currency"}
        />
        <BinderAnalyticsCard
          label={"Total Cards"}
          icon={<InventoryIcon />}
          value={totalCards}
          type={"num"}
        />
        <DiversityChart />
        <RecentlyAdded icon={<LocalAtmIcon />} label={"Recently Added"}/>
      </div>
    </div>
  );
}
export default BinderAnalytics;
