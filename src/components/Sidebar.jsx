import { useState } from "react";
import CreateBasketModal from "./CreateBasketModal";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isMyBaskets, setIsMyBaskets] = useState(false);
  const [isCreateBasket, setIsCreateBasket] = useState(false);
  return (
    <div className="w-full max-w-[280px]">
      <button
        onClick={() => setIsCreateBasket((val) => !val)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-8 py-1.5 tracking-wide transition-all hover:bg-amber-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Create New Basket
      </button>
      {isCreateBasket ? (
        <CreateBasketModal
          isCreateBasket={isCreateBasket}
          setIsCreateBasket={setIsCreateBasket}
        />
      ) : null}
      <div className="my-baskets-wrapper mt-6">
        <div className="flex w-full">
          <span
            onClick={() => setIsMyBaskets((val) => !val)}
            className="text-sm text-gray-500"
          >
            My Baskets
          </span>
          <span className="ml-auto text-sm text-gray-500">
            <Link to="/basket">Basket</Link>
          </span>
        </div>
        <div className="custom-scroll mt-2 h-[420px] w-full overflow-y-auto rounded-lg border border-gray-200">
          {isMyBaskets ? <MyBaskets /> : <NotFoundMsg />}
        </div>
      </div>
    </div>
  );
}

function MyBaskets() {
  const myBasketData = [
    {
      name: "Ethereum Portfolio",
      coins: ["ETH", "USDC", "XRP"],
      netChange: "+13.92%",
    },
    {
      name: "Mini Portfolio",
      coins: ["BTC", "DOG", "USDC", "GAL"],
      netChange: "+6.56%",
    },
    {
      name: "Pink Slip Basket",
      coins: ["DOG", "GAL"],
      netChange: "-48.77%",
    },
    {
      name: "Ethereum Portfolio",
      coins: ["ETH", "USDC", "XRP"],
      netChange: "+13.92%",
    },
    {
      name: "Mini Portfolio",
      coins: ["BTC", "DOG", "USDC", "GAL"],
      netChange: "+6.56%",
    },
    {
      name: "Pink Slip Basket",
      coins: ["DOG", "GAL"],
      netChange: "-48.77%",
    },
    {
      name: "Ethereum Portfolio",
      coins: ["ETH", "USDC", "XRP"],
      netChange: "+13.92%",
    },
    {
      name: "Mini Portfolio",
      coins: ["BTC", "DOG", "USDC", "GAL"],
      netChange: "+6.56%",
    },
    {
      name: "Pink Slip Basket",
      coins: ["DOG", "GAL"],
      netChange: "-48.77%",
    },
  ];
  return (
    <ul className="w-full">
      {myBasketData.map((item, idx) => {
        return (
          <li
            key={idx}
            className="flex w-full cursor-pointer justify-between py-3 px-3 transition-all hover:bg-gray-50"
          >
            <div className="">
              <span className="block text-sm">{item.name}</span>
              <span className="block text-xs text-gray-500">
                {item.coins.join(", ")}
              </span>
            </div>
            <span className="text-xs">{item.netChange}</span>
          </li>
        );
      })}
    </ul>
  );
}

function NotFoundMsg() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="text-gray-300">No baskets found</span>
    </div>
  );
}

export default Sidebar;
