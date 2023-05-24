import React from "react";

function Mobile() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-yellow-400 sm:hidden">
      <h1 className="my-auto text-center">
        <span className="block">
          <span className="font-medium">BitBasket</span> is a web only app
        </span>
        <span className="block">Please view it on a PC or a Laptop</span>
      </h1>
      <div className="py-8 text-xs tracking-wide">
        Made by Ayush, Debarshi and Swarnali
      </div>
    </div>
  );
}

export default Mobile;
