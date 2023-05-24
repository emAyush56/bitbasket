import axios from "axios";
import { PopularCurr } from "../api-config/api";
import { CapFirstChar, PriceFormatter } from "../utils/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../utils/CryptoContext";
function List() {
  const history = useNavigate();
  const { currency, symbol } = CryptoState();

  console.log(currency);

  const [popularCurrData, setPopularCurrData] = useState([]);

  const getPopularCurr = async () => {
    const { data } = await axios.get(PopularCurr(currency));
    setPopularCurrData(data);
  };

  useEffect(() => {
    getPopularCurr();
  }, [currency]);

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    return popularCurrData.filter((c) => {
      return (
        c.name.toLowerCase().includes(search) ||
        c.symbol.toLowerCase().includes(search)
      );
    });
  };

  return (
    <div className="h-full w-full">
      <div className="search-box pl-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find your crypto"
          className="h-9 w-96 rounded-lg border-none bg-gray-100 p-3 tracking-wide outline-none focus:ring-0"
        />
      </div>
      <div className="list h-full">
        <span className="mt-9 block pl-3 text-xl font-medium">
          Popular 100 Cryptocurrencies
        </span>
        <div className="custom-scroll mt-6 max-h-[70vh] overflow-y-scroll">
          <table className="w-full">
            <thead className="sticky top-0 z-[0] rounded-lg bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-3 py-2 font-normal">Name</th>
                <th className="px-3 py-2 font-normal">Price</th>
                <th className="px-3 py-2 font-normal">24H Change</th>
                <th className="px-3 py-2 text-right font-normal">Market Cap</th>
              </tr>
            </thead>
            <tbody className="">
              {handleSearch().map((item) => {
                const change = item.price_change_percentage_24h > 0;
                return (
                  <tr
                    key={item.id}
                    className="cursor-pointer transition-all hover:bg-gray-50"
                    onClick={() => history(`/coins/${item.id}`)}
                  >
                    <td className="px-3 py-4">
                      {CapFirstChar(item.id)}{" "}
                      <span className="ml-1 text-sm text-gray-400">{`${item.symbol.toUpperCase()}`}</span>
                    </td>
                    <td className="px-3 py-4">
                      {symbol}
                      {PriceFormatter(item.current_price, 2)}
                    </td>
                    <td
                      className={`px-3 py-4 ${
                        change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {change > 0 ? "+" : null}
                      {item.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="px-3 py-4 text-right">
                      {symbol}
                      {PriceFormatter(item.market_cap).slice(0, -6)}M
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default List;
