function List() {
  const data = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$30,158",
      change: "+2.36%",
      "market-cap": "$583,364M",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$1,916",
      change: "+1.30%",
      "market-cap": "$230,780M",
    },
    {
      name: "Galxe",
      symbol: "GAL",
      price: "$329.74",
      change: "-12.06%",
      "market-cap": "$52,039M",
    },
    {
      name: "Doge",
      symbol: "DOG",
      price: "$30,158",
      change: "-0.55%",
      "market-cap": "$583,364M",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      price: "$1,916",
      change: "+12.38%",
      "market-cap": "$230,780M",
    },
    {
      name: "Ripple",
      symbol: "XRP",
      price: "$329.74",
      change: "-4.39%",
      "market-cap": "$52,039M",
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      price: "$94.94",
      change: "-0.55%",
      "market-cap": "$583,364M",
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$32.23",
      change: "-0.55%",
      "market-cap": "$583,364M",
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      price: "$1.12",
      change: "+12.38%",
      "market-cap": "$230,780M",
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: "$6.45",
      change: "-4.39%",
      "market-cap": "$52,039M",
    },
  ];
  return (
    <div className="h-full w-full">
      <span className="pl-3 text-xl font-medium">Popular Cryptocurrencies</span>
      <div className="custom-scroll mt-6 max-h-[70vh] overflow-y-scroll">
        <table className="w-full">
          <thead className="sticky top-0 z-[-1] rounded-lg bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-3 py-2 font-normal">Name</th>
              <th className="px-3 py-2 font-normal">Price</th>
              <th className="px-3 py-2 font-normal">Change</th>
              <th className="px-3 py-2 text-right font-normal">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr
                  key={item.name}
                  className="cursor-pointer transition-all hover:bg-gray-50"
                >
                  <td className="px-3 py-4">
                    {item.name}{" "}
                    <span className="ml-1 text-sm text-gray-400">{`${item.symbol}`}</span>
                  </td>
                  <td className="px-3 py-4">{item.price}</td>
                  <td className="px-3 py-4">{item.change}</td>
                  <td className="px-3 py-4 text-right">{item["market-cap"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
