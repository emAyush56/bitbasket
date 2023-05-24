import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../api-config/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PriceFormatter } from "../utils/utils";
import { CryptoState } from "../utils/CryptoContext";

export default function Chart({ crypto }) {
  const { currency } = CryptoState();
  const [historicalData, setHistoricalData] = useState([]);

  const [days, setDays] = useState(30);

  const getHistoricalData = async () => {
    const { data } = await axios.get(
      HistoricalChart(crypto.id, days, currency)
    );
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    getHistoricalData();
  }, [currency, days]);

  console.log(historicalData);

  const graphData = historicalData
    ? historicalData.map((item) => {
        const [timestamp, price] = item;
        const date = new Date(timestamp).toLocaleDateString("en-us");
        const formattedPrice = PriceFormatter(price).slice(0, -3);
        return {
          Date: date,
          Price: price,
        };
      })
    : [];

  return (
    <div className="wrapper">
      <div className="chart">
        {graphData.length > 0 && (
          <div className="text-xs">
            <AreaChart
              width={800}
              height={300}
              data={graphData}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Price"
                stroke="#CA8A04"
                fill="#FACC15"
              />
            </AreaChart>
          </div>
        )}
      </div>
      <div className="buttons mt-6 flex justify-between gap-4">
        <button
          onClick={() => setDays(7)}
          className="rounded-md bg-lime-100 px-8 py-1 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-lime-300 active:scale-95"
        >
          7 Days
        </button>
        <button
          onClick={() => setDays(30)}
          className="rounded-md bg-lime-200 px-6 py-1 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-lime-300 active:scale-95"
        >
          30 Days
        </button>
        <button
          onClick={() => setDays(91)}
          className="py-m rounded-md bg-lime-300 px-6 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-lime-400 active:scale-95"
        >
          3 Months
        </button>
        <button
          onClick={() => setDays(183)}
          className="rounded-md bg-lime-400 px-6 py-1 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-lime-300 active:scale-95"
        >
          6 Months
        </button>
        <button
          onClick={() => setDays(365)}
          className="rounded-md bg-lime-500 px-6 py-1 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-lime-300 active:scale-95"
        >
          1 Year
        </button>
        <button
          onClick={() => setDays(365 * 5)}
          className="py-m rounded-md bg-lime-600 px-6 transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-lime-300 active:scale-95"
        >
          5 Years
        </button>
      </div>
    </div>
  );
}
