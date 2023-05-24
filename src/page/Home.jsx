import { Route, Routes } from "react-router-dom";
import List from "../components/List";
import Basket from "../components/Basket";

function Home() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
}

export default Home;
