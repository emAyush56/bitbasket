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

// function Header() {
//   return (
//     <header>
//       <div className="logo flex w-[280px] items-center text-2xl font-medium">
//         <span>
//           <Link to="/">BitBasket</Link>
//         </span>
//         <span className="login ml-auto cursor-pointer rounded-md bg-yellow-400 px-3 py-1 text-base font-normal">
//           Login
//         </span>
//       </div>
//     </header>
//   );
// }
