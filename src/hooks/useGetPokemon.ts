import { useEffect, useState } from 'react';
import { api, TPokeapiResult } from '../api';

export function useGetPokemon(url: string | null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemons, setPokemons] = useState<TPokeapiResult[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    api
      .getPokemons(url)
      .then((response) => {
        if (!response.success) return;

        setPokemons((prev) => [...prev, ...response.data.results]);
        setNextPage(response.data.next);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { loading, error, pokemons, nextPage };
}
