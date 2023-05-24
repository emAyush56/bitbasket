import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart, SingleCrypto } from "../api-config/api";
import { PriceFormatter } from "../utils/utils";
import Chart from "../components/Chart";

function Crypto() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState();

  const getSingleCrypto = async () => {
    const { data } = await axios.get(SingleCrypto(id));
    setCrypto(data);
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

export default Crypto;
