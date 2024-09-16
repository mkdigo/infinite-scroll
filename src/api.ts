const baseURL = 'https://pokeapi.co/api/v2/pokemon';

export type TPokeapiResult = {
  name: string;
  url: string;
};

type TPokeapiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPokeapiResult[];
};

type TResponse = {
  success: true;
  data: TPokeapiResponse;
};

type TResponseError = {
  success: false;
  error: string;
};

export const api = {
  getPokemons: async (
    url: string | null = null
  ): Promise<TResponse | TResponseError> => {
    // let response: TPokeapiResponse | TError;

    if (url === null) url = baseURL;

    const response = await fetch(url);

    if (!response.ok) {
      return {
        success: false,
        error: 'pokeapi error',
      };
    }

    const data: TPokeapiResponse = await response.json();

    return {
      success: true,
      data,
    };
  },
};
