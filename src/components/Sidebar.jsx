import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../utils/CryptoContext";

function Sidebar() {
  const { currency, setCurrency } = CryptoState();
  return (
    <div className="mt-9 h-full max-h-[76vh] w-full max-w-[280px]">
      <div className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-400 px-8 py-1.5 tracking-wide transition-all hover:scale-105 active:scale-95">
        <BookMarkIcon className="h-4 w-4 transition-all" />
        Watch Basket
      </div>
      <div className="select-currency mt-6">
        <div className="flex w-full">
          <span className="text-sm text-gray-500">Select Currency</span>
        </div>
        <div className="options mt-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full rounded-lg border-none bg-gray-100 p-2 tracking-wide outline-none focus:ring-0"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function BookMarkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}

export default Sidebar;
