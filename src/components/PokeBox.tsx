import React from "react";
import { MdCatchingPokemon } from "react-icons/md";

export default function PokeBox({ id, name, sprite, types }) {
  return (
    <button
      className="flex flex-col items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition relative md:w-60 w-full"
    >
      <div className="flex items-center gap-1">
        <span className="text-2xl">
          <MdCatchingPokemon />
        </span>

        <h2>{name.toUpperCase()}</h2>
      </div>

      <img className="w-24 h-24" src={sprite} alt="pokemon sprite" />

      <div className="flex gap-2">
        {types.map((item) => (
          <span key={item.type.name} className="bg-purple-500 px-2 rounded-md">
            {item.type.name.toUpperCase()}
          </span>
        ))}
      </div>

      <span className="absolute top-1 right-2 font-roboto text-sm">#{id}</span>
    </button>
  );
}
