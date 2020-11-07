const baseURL = 'https://pokeapi.co/api/v2/pokemon'

const api = {
  getPokemons: async (url = null) => {
    let response

    if (url === null) url = baseURL

    try {
      const result = await fetch(url)
      response = await result.json()
    } catch (err) {
      console.log(err.message)
      response = {
        'error': err.message,
      }
    }

    return response
  },
}

export default api