import Head from "next/head";
import { GetStaticProps } from "next";
import { MdCatchingPokemon } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

interface HomeProps {
  pokeList: PokeList;
}

interface PokeList {
  count: number;
  next: URL;
  previous?: URL;
  results: [Results];
}

interface Results {
  name: string;
  url: URL;
}

interface pokemonTypes {
  type: {
    name: string;
  };
}
interface pokemonList {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: pokemonTypes[];
}

export default function Home({ pokeList }: HomeProps) {
  const [pokemonURL, setPokemonURL] = useState([]);
  const [pokemonList, setPokemonList] = useState<pokemonList[]>([]);

  useEffect(() => {
    setPokemonURL(pokeList.results);

    getURL();
  }, [pokemonURL]);

  function getURL() {
    const getUrl = pokemonURL.map(async (item) => await axios(item.url));

    setPokemonList([]);

    Promise.allSettled(getUrl)
      .then((responses) =>
        responses.forEach((result) => {
          if (result.status === "fulfilled") {
            const getValue: any = result.value.data;

            setPokemonList((prevState) => [...prevState, getValue]);
          }
        })
      )
      .catch((err) => {
        console.error(`CATCH ERROR ${err}`);
      });
  }

  return (
    <>
      <Head>
        <title>React Pókedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto items-center flex flex-col gap-8 h-full md:justify-center pb-8 overflow-y-scroll md:overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 md:grid-rows-2 gap-4 mt-4 md:mt-0">
          {pokemonList.map((item) => {
            return (
              <button
                key={item.id}
                className="flex flex-col items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition relative"
              >
                <div className="flex items-center gap-1">
                  <span className="text-2xl">
                    <MdCatchingPokemon />
                  </span>

                  <h1>{item.name.toUpperCase()}</h1>
                </div>

                <img src={item.sprites.front_default} alt="pokemon sprite" />

                <div className="flex gap-2">
                  {item.types.map((item) => (
                    <span key={item.type.name} className="bg-purple-500 px-2 rounded-md">
                      {item.type.name.toUpperCase()}
                    </span>
                  ))}
                </div>

                <span className="absolute top-0 right-2">{item.id}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-8 items-center">
          <button disabled={pokeList.previous == null} className="bg-red-500 w-24 h-12 text-xl rounded-md hover:bg-red-800 transition disabled:bg-gray-700 disabled:cursor-not-allowed">
            PREVIOUS
          </button>

          <button className="bg-green-500 w-24 h-12 text-xl rounded-md hover:bg-green-800 transition">
            NEXT
          </button>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"
  );
  const pokeList: PokeList = await res.json();

  return {
    props: {
      pokeList,
    },
  };
};
