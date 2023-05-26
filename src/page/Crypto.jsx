import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart, SingleCrypto } from "../api-config/api";
import { PriceFormatter } from "../utils/utils";
import Chart from "../components/Chart";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CryptoState } from "../utils/CryptoContext";

function Crypto() {
  const { basket, user } = CryptoState();
  const { id } = useParams();
  const [crypto, setCrypto] = useState();

  const getSingleCrypto = async () => {
    const { data } = await axios.get(SingleCrypto(id));
    setCrypto(data);
  };

  const inBasket = basket.includes(crypto?.id);

  const addToBasket = async () => {
    const cryptoRef = doc(db, "basket", user.uid);
    try {
      await setDoc(cryptoRef, {
        coins: basket ? [...basket, crypto?.id] : [crypto?.id],
      });
      alert(`${crypto.name} added to the basket!`);
    } catch (error) {
      alert(error);
    }
  };

  const removeFromBasket = async () => {
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

  useEffect(() => {
    getSingleCrypto();
  }, []);

  if (!crypto) return "Loading...";

  return (
    <div className="single-crypto flex flex-col gap-4">
      {crypto && (
        <div className="single-crypto">
          <div className="wrapper">
            <header className="flex items-center">
              <div className="name-wrapper">
                <span className="text-2xl font-medium">{crypto.name}</span>
                <span className="ml-3 text-sm text-gray-400">
                  {crypto.symbol.toUpperCase()}
                </span>
              </div>
              {user && (
                <button
                  onClick={inBasket ? removeFromBasket : addToBasket}
                  className={`ml-5 flex items-center justify-center rounded-full px-5 py-1 transition-all hover:scale-105 active:scale-95 ${
                    inBasket ? "bg-orange-600 text-white" : "bg-yellow-400"
                  }`}
                >
                  {inBasket ? (
                    "- Remove from basket"
                  ) : (
                    <span className="flex items-center justify-center">
                      <PlusIcon className="mr-2 h-5 w-5" /> Add to basket
                    </span>
                  )}
                </button>
              )}
              <span className="price ml-auto text-2xl font-medium">
                ₹{PriceFormatter(crypto.market_data.current_price.inr, 2)}
              </span>
            </header>
            <div className="chart my-9">
              <Chart crypto={crypto} />
            </div>
            <div className="info">
              <p className="about">
                <span className="mb-1 block text-lg font-medium">
                  About {crypto.name}
                </span>
                {crypto.description.en.split(". ")[0]}.
              </p>
              <div className="stats mt-6 flex items-center text-lg">
                <span className="block rounded-md border border-orange-400 bg-orange-100 px-6 py-1">
                  RANK -{" "}
                  <span className="font-semibold">
                    {crypto.market_cap_rank}
                  </span>
                </span>
                <span className="ml-auto block rounded-md border border-orange-400 bg-orange-100 px-6 py-1">
                  MARKET CAP -{" "}
                  <span className="font-semibold">
                    ₹
                    {PriceFormatter(crypto.market_data.market_cap.inr).slice(
                      0,
                      -6
                    )}
                    M
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlusIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default Crypto;
