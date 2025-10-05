import type { PokemonData } from "../types/pokemon-types";
import type { PokemonListItem } from "../types/pokemon-types";

export async function fetchRandomPokemonlist(
    setPokemonList: (data: PokemonData[]) => void,
    setIsLoading: (state: boolean) => void
) {
    try {
        setIsLoading(true);
        const countResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
        const countData = await countResponse.json();
        const totalPokemon = countData.count;
        const randomOffset = Math.floor(Math.random() * (totalPokemon - 10));
        const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${randomOffset}`);
        const listData = await listResponse.json();

        const pokemonPromises = listData.results.map(async (pokemon: PokemonListItem) => {
            const detailsResponse = await fetch(pokemon.url);
            return await detailsResponse.json();
        });

        const fullPokemonData = await Promise.all(pokemonPromises);
        setPokemonList(fullPokemonData);
    } catch (error) {
        console.error('Erro ao buscar o Pokémon:', error);
    } finally {
        setIsLoading(false);
    }
}

export async function fetchPokemonByType(
    type: string,
    setPokemonList: (data: PokemonData[]) => void,
    setIsLoading: (state: boolean) => void
) {
    setIsLoading(true);
    try {
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const typeData = await typeResponse.json();
        const pokemonList = typeData.pokemon.slice(0, 10);
        const pokemonPromises = pokemonList.map(async (item: any) => {
            const detailsResponse = await fetch(item.pokemon.url);
            return await detailsResponse.json();
        });
        const fullPokemonData = await Promise.all(pokemonPromises);
        setPokemonList(fullPokemonData);
    } catch (error) {
        console.error("Erro ao buscar pokémons por tipo:", error);
    } finally {
        setIsLoading(false);
    }
};

export async function fetchExtraPokemonList(
    type: string,
    setExtraPokemonList: (data: PokemonData[]) => void
) {
    try {
        let listData = { results: [] };
        if (type) {
            const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const typeData = await typeResponse.json();
            const pokemonList = typeData.pokemon.slice(0, 10);
            listData = { results: pokemonList.map((p: any) => p.pokemon) };
        } else {
            const countResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
            const countData = await countResponse.json();
            const totalPokemon = countData.count;
            const randomOffset = Math.floor(Math.random() * (totalPokemon - 10));
            const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${randomOffset}`);
            listData = await listResponse.json();
        }

        const pokemonPromises = listData.results.map(async (pokemon: PokemonListItem) => {
            const detailsResponse = await fetch(pokemon.url);
            return await detailsResponse.json();
        });

        const fullPokemonData = await Promise.all(pokemonPromises);
        setExtraPokemonList(fullPokemonData);
    } catch (error) {
        console.error("Erro ao buscar pokémons extras:", error);
    }
}