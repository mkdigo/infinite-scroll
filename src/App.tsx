import { useCallback, useState } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { useGetPokemon } from './hooks/useGetPokemon';

import './styles/app.css';

export function App() {
  const [url, setUrl] = useState<string | null>(null);
  const { loading, error, pokemons, nextPage } = useGetPokemon(url);

  let observer: IntersectionObserver | undefined;
  observer = undefined;

  const lastPokemonElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;

      if (observer) observer.disconnect();

      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPage) {
          setUrl(nextPage);
        }
      });

      if (node) observer.observe(node);
    },
    [loading, nextPage]
  );

  //Functions
  const getId = (url: string) => {
    const urlSplit = url.split('/');
    const id = urlSplit[urlSplit.length - 2];
    return id;
  };

  const getImg = (id: string) => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return url;
  };

  return (
    <>
      <Header />

      <main className='container'>
        <div className='content'>
          <h1>Pokemon List</h1>

          <ul className='pokemon-list'>
            {pokemons.map((pokemon, index) => {
              const id = getId(pokemon.url);

              if (pokemons.length === index + 1) {
                return (
                  <li ref={lastPokemonElementRef} key={index}>
                    <img src={getImg(id)} alt='' />
                    <span>{pokemon.name}</span>
                  </li>
                );
              }

              return (
                <li ref={lastPokemonElementRef} key={index}>
                  <img src={getImg(id)} alt='' />
                  <span>{pokemon.name}</span>
                </li>
              );
            })}
          </ul>

          <div>{loading && 'Loading ...'}</div>
          <div>{error && 'Error'}</div>
        </div>
      </main>

      <Footer />
    </>
  );
}
