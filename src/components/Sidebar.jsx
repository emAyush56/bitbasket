import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CryptoState } from "../utils/CryptoContext";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Sidebar() {
  const { currency, setCurrency, user } = CryptoState();
  const [isOpen, setIsOpen] = useState(false);
  const history = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        alert("Login sucessfull!");
        setIsOpen(false);
      })
      .catch((err) => alert(err));
  };
  const logOut = () => {
    signOut(auth);
    history("/");
    alert("User has been successfully logged out!");
  };
  return (
    <div className="mt-9 flex h-full max-h-[76vh] w-full max-w-[280px] flex-col">
      {user ? (
        <>
          <button
            onClick={logOut}
            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-400 px-8 py-1.5 tracking-wide transition-all hover:scale-105 active:scale-95"
          >
            Logout
          </button>
          <Link
            to="/basket"
            className="group mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-400 px-8 py-1.5 tracking-wide transition-all hover:scale-105 active:scale-95"
          >
            <BookMarkIcon className="h-4 w-4 transition-all" />
            My Basket
          </Link>
        </>
      ) : (
        <div className="user-login" onClick={() => setIsOpen(true)}>
          <button className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-400 px-8 py-1.5 tracking-wide transition-all hover:scale-105 active:scale-95">
            Login
          </button>
          <ModalPopUp isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="w-[300px] text-center">
              <div className="mx-auto my-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Let's log you in
                </h3>
                <div className="mt-4 space-y-3">
                  <button
                    onClick={signInWithGoogle}
                    className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-400 px-8 py-1.5 transition-all hover:scale-105 active:scale-95"
                  >
                    Signin with<span className="font-medium">Google</span>
                  </button>
                </div>
              </div>
            </div>
          </ModalPopUp>
        </div>
      )}
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

function ModalPopUp({ isOpen, onClose, children }) {
  return (
    <div
      className={`fixed inset-0 z-[1] flex items-center justify-center transition-colors ${
        isOpen ? "visible bg-black/40 backdrop-blur-sm" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl bg-white p-6 shadow transition-all ${
          isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-lg p-0.5 text-gray-400 transition-all hover:bg-gray-50"
        >
          <XMarkIcon className={`h-5 w-5 stroke-2`} />
        </button>
        {children}
      </div>
    </div>
  );
}

function XMarkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default Sidebar;
