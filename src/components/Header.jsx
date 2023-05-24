import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="logo w-[280px] text-2xl font-medium">
        <Link to="/">BitBasket</Link>
      </div>
    </header>
  );
}

export default Header;
