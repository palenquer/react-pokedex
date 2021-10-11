import Head from "next/head";
import { GetStaticProps } from "next";
import { MdCatchingPokemon } from "react-icons/md";

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

export default function Home({ pokeList }: HomeProps) {
  return (
    <>
      <Head>
        <title>React Pókedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto items-center flex flex-col gap-8">
        <div>
          {pokeList.results.map((item) => {
            return (
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  <MdCatchingPokemon />
                </span>
                <h1>{item.name.toUpperCase()}</h1>
              </div>
            );
          })}
        </div>

        <div className="flex gap-8">
          <button>Previous</button>

          <button>Next</button>
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
