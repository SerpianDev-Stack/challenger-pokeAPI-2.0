import { fetchExtraPokemonList, fetchRandomPokemonlist, fetchPokemonByType } from ".";


global.fetch = jest.fn();
const mockFetch = global.fetch as jest.Mock;

const mockSetPokemonList = jest.fn();
const mockSetIsLoading = jest.fn();
const mockSetExtraPokemonList = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test("fetchRandomPokemonlist busca 10 pokémons e atualiza estado corretamente", async () => {
  // 1️⃣ Mock das respostas de fetch
  mockFetch
    .mockResolvedValueOnce({
      json: async () => ({ count: 1000 }),
    }) // primeira chamada -> count
    .mockResolvedValueOnce({
      json: async () => ({
        results: Array.from({ length: 10 }, (_, i) => ({
          name: `pokemon${i + 1}`,
          url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
        })),
      }),
    }) // segunda chamada -> lista
    .mockImplementation(async (url) => ({
      json: async () => ({ name: url.split("/").at(-2) }),
    })); // chamadas subsequentes -> detalhes

  // 2️⃣ Executa a função
  await fetchRandomPokemonlist(mockSetPokemonList, mockSetIsLoading);

  // 3️⃣ Verificações
  expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true);
  expect(mockSetIsLoading).toHaveBeenLastCalledWith(false);
  expect(mockSetPokemonList).toHaveBeenCalledWith(
    expect.arrayContaining([expect.objectContaining({ name: "1" })])
  );
  expect(mockFetch).toHaveBeenCalledTimes(12); // 1 count + 1 list + 10 detalhes
});

test("fetchPokemonByType busca pokémons de um tipo e atualiza estado", async () => {
  mockFetch
    .mockResolvedValueOnce({
      json: async () => ({
        pokemon: Array.from({ length: 10 }, (_, i) => ({
          pokemon: { name: `fire${i + 1}`, url: `url${i + 1}` },
        })),
      }),
    })
    .mockImplementation(async (url) => ({
      json: async () => ({ name: url }),
    }));

  await fetchPokemonByType("fire", mockSetPokemonList, mockSetIsLoading);

  expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true);
  expect(mockSetIsLoading).toHaveBeenLastCalledWith(false);
  expect(mockSetPokemonList).toHaveBeenCalledWith(
    expect.arrayContaining([expect.objectContaining({ name: "url1" })])
  );
});

test("fetchExtraPokemonList com tipo retorna pokémons do tipo", async () => {
  mockFetch
    .mockResolvedValueOnce({
      json: async () => ({
        pokemon: Array.from({ length: 10 }, (_, i) => ({
          pokemon: { name: `water${i + 1}`, url: `url${i + 1}` },
        })),
      }),
    })
    .mockImplementation(async (url) => ({
      json: async () => ({ name: url }),
    }));

  await fetchExtraPokemonList("water", mockSetExtraPokemonList);

  expect(mockSetExtraPokemonList).toHaveBeenCalledWith(
    expect.arrayContaining([expect.objectContaining({ name: "url1" })])
  );
});

test("fetchExtraPokemonList sem tipo retorna lista aleatória", async () => {
  mockFetch
    .mockResolvedValueOnce({
      json: async () => ({ count: 1000 }),
    })
    .mockResolvedValueOnce({
      json: async () => ({
        results: Array.from({ length: 10 }, (_, i) => ({
          name: `random${i + 1}`,
          url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
        })),
      }),
    })
    .mockImplementation(async (url) => ({
      json: async () => ({ name: url }),
    }));

  await fetchExtraPokemonList("", mockSetExtraPokemonList);

  expect(mockSetExtraPokemonList).toHaveBeenCalledWith(
    expect.arrayContaining([expect.objectContaining({ name: "https://pokeapi.co/api/v2/pokemon/1/" })])
  );
});

test("fetchRandomPokemonlist lida com erro no fetch", async () => {
  mockFetch.mockRejectedValueOnce(new Error("Falha na API"));
  await fetchRandomPokemonlist(mockSetPokemonList, mockSetIsLoading);
  expect(mockSetIsLoading).toHaveBeenLastCalledWith(false);
  expect(mockSetPokemonList).not.toHaveBeenCalled();
});

