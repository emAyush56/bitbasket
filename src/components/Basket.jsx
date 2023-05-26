import React, { useState } from "react";
import { CryptoState } from "../utils/CryptoContext";
import { PriceFormatter } from "../utils/utils";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Basket() {
  const { symbol, basket, popularCurrData, user } = CryptoState();

  const removeFromBasket = async (coin) => {
    const cryptoRef = doc(db, "basket", user.uid);
    try {
      await setDoc(
        cryptoRef,
        {
          coins: basket.filter((watch) => watch !== crypto?.id),
        },
        { merge: true }
      );
      alert(`${crypto.name} removed from the basket!`);
    } catch (error) {
      alert(error);
    }
  };

  const [sugg, setSugg] = useState(false);

  return (
    <div className="w-full">
      <header className="text-xl font-medium">My Basket</header>
      <div className="basket mt-10 h-full space-y-3">
        {popularCurrData.map((coin) => {
          if (basket.includes(coin.id)) {
            return (
              <Item
                key={coin.id}
                symbol={symbol}
                c_symbol={coin.symbol}
                name={coin.name}
                price={coin.current_price}
                coin={coin}
                removeFromBasket={removeFromBasket}
              />
            );
          }
        })}
      </div>
      <span
        className="mt-10 block cursor-pointer select-none text-sm text-gray-300"
        onClick={() => setSugg((prev) => !prev)}
      >
        {sugg ? "Hide" : "Show"} `Suggestions`
      </span>
      {sugg && (
        <div className="future-suggestions mt-10">
          <header className="text-lg font-medium">Suggestions</header>
          <div className="gen-sugg mt-6 flex h-60 items-center justify-center rounded-lg border border-gray-300">
            <span className="text-sm text-gray-400">
              Suggestions to be added
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Item({
  symbol,
  c_symbol = "ETH",
  name,
  price = "₹22,384.26",
  coin,
  removeFromBasket,
}) {
  return (
    <div className="flex h-10 w-full items-center gap-3 rounded-md bg-gray-50 px-5">
      <span className="w-40 max-w-md overflow-hidden text-gray-500">
        {c_symbol.toUpperCase()}
      </span>
      <span className="w-60 max-w-md overflow-hidden text-gray-800">
        {name}
      </span>
      <span className="w-60 max-w-md overflow-hidden text-gray-800">
        {symbol}
        {PriceFormatter(price, 2)}
      </span>
      <div className="delete ml-auto">
        <Link to={`/coins/${coin.id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 cursor-pointer text-gray-500 transition-all
        hover:scale-110 hover:text-yellow-400"
          >
            <path d="M6 3a3 3 0 00-3 3v1.5a.75.75 0 001.5 0V6A1.5 1.5 0 016 4.5h1.5a.75.75 0 000-1.5H6zM16.5 3a.75.75 0 000 1.5H18A1.5 1.5 0 0119.5 6v1.5a.75.75 0 001.5 0V6a3 3 0 00-3-3h-1.5zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM4.5 16.5a.75.75 0 00-1.5 0V18a3 3 0 003 3h1.5a.75.75 0 000-1.5H6A1.5 1.5 0 014.5 18v-1.5zM21 16.5a.75.75 0 00-1.5 0V18a1.5 1.5 0 01-1.5 1.5h-1.5a.75.75 0 000 1.5H18a3 3 0 003-3v-1.5z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Basket;
