import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PopularCurr } from "../api-config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

function CryptoContext({ children }) {
  const [popularCurrData, setPopularCurrData] = useState([]);
  const getPopularCurr = async () => {
    const { data } = await axios.get(PopularCurr(currency));
    setPopularCurrData(data);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const [basket, setBasket] = useState([]);
  useEffect(() => {
    if (user) {
      const cryptoRef = doc(db, "basket", user.uid);
      var unsubscribe = onSnapshot(cryptoRef, (c) => {
        if (c.exists()) {
          setBasket(c.data().coins);
        } else {
          console.log("No items in the watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        popularCurrData,
        getPopularCurr,
        user,
        basket,
      }}
    >
      {children}
    </Crypto.Provider>
  );
}

export const CryptoState = () => {
  return useContext(Crypto);
};

export default CryptoContext;
