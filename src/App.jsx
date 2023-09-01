import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./page/Home";
import Crypto from "./page/Crypto";
import Mobile from "./page/Mobile";
import Basket from "./components/Basket";

function App() {
  return (
    <>
      <div className="mobile">
        <Mobile />
      </div>
      <main className="mx-auto hidden max-w-6xl gap-14 px-4 sm:flex">
        <div className="left mt-4">
          <Header />
          <Sidebar />
        </div>
        <div className="right mt-4 w-full">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/coins/:id" element={<Crypto />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
