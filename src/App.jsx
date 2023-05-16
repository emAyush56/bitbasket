import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import List from "./components/List";
import Sidebar from "./components/Sidebar";
import Basket from "./components/Basket";

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto mt-10 flex max-w-6xl gap-20 px-4">
        <Sidebar />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
