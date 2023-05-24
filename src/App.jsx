import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./page/Home";
import Crypto from "./page/Crypto";

function App() {
  return (
    <>
      <main className="mx-auto flex max-w-6xl gap-14 px-4">
        <div className="left mt-4">
          <Header />
          <Sidebar />
        </div>
        <div className="right mt-4 w-full">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/coins/:id" element={<Crypto />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
