import React from "react";
import { CgPokemon } from "react-icons/cg";

export default function Header() {
  return (
    <header className=" bg-gray-700 h-16 items-center flex sticky top-0">
      <div className="mx-auto container px-6 md:px-0">
        <h1 className="flex gap-2 items-center text-4xl">
          <span className="text-blue-300">react</span>
          <CgPokemon />
          <span className="text-yellow-300">POKÉDEX</span>
        </h1>
      </div>
    </header>
  );
}
