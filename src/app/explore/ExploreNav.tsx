import "./explore.css";

type Tab =
  | "All Coins"
  | "Watchlist"
  | "Top Gainers"
  | "Top Losers"
  | "Recently Watched";

interface ExploreNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const ExploreNav = ({ activeTab, onTabChange }: ExploreNavProps) => {
  const tabs: Tab[] = [
    "All Coins",
    "Watchlist",
    "Top Gainers",
    "Top Losers",
    "Recently Watched",
  ];

  return (
    <div className="flex space-x-4 mb-4 overflow-x-scroll no-scrollbar">
      {tabs.map((tab) => {
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-1 rounded-full text-xs text-secondary ${
              activeTab === tab ? "active" : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default ExploreNav;
