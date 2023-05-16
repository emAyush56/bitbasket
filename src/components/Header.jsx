import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center gap-20 px-4 pt-4">
      <div className="logo w-[280px] text-2xl font-medium">
        <Link to="/">BitBasket</Link>
      </div>
      <div className="search-box pl-3">
        <input
          type="search"
          placeholder="Find your crypto"
          className="h-9 w-96 rounded-lg bg-gray-100 p-3 tracking-wide outline-none"
        />
      </div>
    </header>
  );
}

export default Header;
