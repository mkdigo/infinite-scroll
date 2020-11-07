import { useEffect, useState } from 'react'
import api from '../../api'


export default function useGetPokemon (url) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [nextPage, setNextPage] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    api.getPokemons(url)
      .then(response => {
        setPokemons(prev => [...prev, ...response.results])
        setNextPage(response.next)
        setLoading(false)
      })
      .catch (err => {
        setError(true)
      })
  }, [url])

  return { loading, error, pokemons, nextPage }
}