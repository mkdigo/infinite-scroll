import { useRef, useCallback, useState } from 'react';
import './styles.css'

import useGetPokemon from './useGetPokemon'

export default function Home () {
  const [url, setUrl] = useState(null)
  const { loading, error, pokemons, nextPage } = useGetPokemon(url)

  const observer = useRef()
  const lastPokemonElementRef = useCallback(node => {
    if (loading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && nextPage) {
        setUrl(nextPage)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, nextPage])

  //Functions
  const getId = (url) => {
    const urlSplit = url.split("/");
    const id = urlSplit[urlSplit.length - 2]
    return id
  }

  const getImg = (id) => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    return url
  }

  return(
    <main className="container">
      <div className="content">
        <h1>Pokemon List</h1>

        <ul className="pokemon-list">
          {pokemons.map((pokemon, index) => {
            const id = getId(pokemon.url)

            if(pokemons.length === index + 1) {
              return (
                <li ref={lastPokemonElementRef} key={index}>
                  <img src={getImg(id)} alt=""/>
                  <span>{pokemon.name}</span>
                </li>
              )
            }

            return (
              <li ref={lastPokemonElementRef} key={index}>
                <img src={getImg(id)} alt=""/>
                <span>{pokemon.name}</span>
              </li>
            )
          })}
        </ul>

        <div>{loading && 'Loading ...'}</div>
        <div>{error && 'Error'}</div>

      </div>
    </main>
  )
}
