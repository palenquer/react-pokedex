import Head from "next/head";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import axios from "axios";
import PokeBox from "../components/PokeBox";
interface PokeList {
  count: number;
  next: string | null;
  previous: string | null;
  results: [Results];
}

interface Results {
  name: string;
  url: string;
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

export default function Home() {
  const [pokemonAPI, setPokemonAPI] = useState<PokeList>();
  const [pokemonList, setPokemonList] = useState<pokemonList[]>([]);
  const [pokeLoading, setPokeLoading] = useState(false);

  useEffect(() => {
    GetURL("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10");
  }, []);

  async function GetURL(url: string) {
    await axios
      .get<PokeList>(url)
      .then((response) => {
        setPokemonAPI(response.data);

        setPokeLoading(true);

        const getUrl = response.data.results.map(
          async (item) => await axios.get<Results>(item.url)
        );

        setPokemonList([]);

        Promise.allSettled(getUrl)
          .then((responses) =>
            responses.forEach((result) => {
              if (result.status === "fulfilled") {
                const getValue: any = result.value.data;

                setPokemonList((prevState) => [...prevState, getValue]);
              }

              setPokeLoading(false);
            })
          )
          .catch((err) => {
            console.error(`CATCH ERROR ${err}`);
          });
      })
      .catch((err) => {
        console.error(`CATCH ERROR ${err}`);
      });
  }

  function NextURL() {
    GetURL(pokemonAPI.next);
  }

  function PreviousURL() {
    GetURL(pokemonAPI.previous);
  }

  return (
    <>
      <Head>
        <title>React Pókedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto items-center flex flex-col gap-8 h-full md:justify-center pb-8 overflow-y-scroll md:overflow-y-auto p-8 md:p-0">
        {pokemonAPI && <h2>Total Pokemons: {pokemonAPI.count}</h2>}
        {pokeLoading ? (
          <div className="h-96 flex justify-center items-center">
            <ReactLoading type="bubbles" color="#ffffff" />
          </div>
        ) : (
          <div className="md:grid grid-cols-5 grid-rows-2 md:gap-4 mt-4 md:mt-0 w-60 md:w-auto flex flex-col gap-8 h-96">
            {pokemonList.map((item) => {
              return (
                <PokeBox
                  key={item.id}
                  id={item.id}
                  name={item.name.toUpperCase()}
                  sprite={item.sprites.front_default}
                  types={item.types}
                />
              );
            })}
          </div>
        )}

        <div className="flex gap-8 items-center">
          <button
            disabled={pokemonAPI && pokemonAPI.previous === null}
            className="bg-red-500 w-24 h-12 text-xl rounded-md hover:bg-red-800 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
            onClick={PreviousURL}
          >
            PREVIOUS
          </button>

          <button
            disabled={pokemonAPI && pokemonAPI.next === null}
            className="bg-green-500 w-24 h-12 text-xl rounded-md hover:bg-green-800 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
            onClick={NextURL}
          >
            NEXT
          </button>
        </div>
      </main>
    </>
  );
}
