import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/themeContext";

export interface PokemonData {
    name: string;
    id: number;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
}

interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonType {
    type: {
        name: string;
        url: string;
    };
}

export interface ComponentsProps {
    $bg?: string;
    $color?: string;
}

interface PokemonListProps {
    showExtra: boolean;
}

const ListTitle = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  padding: 2rem;
  font-family: 'Orbitron';
  background-image: linear-gradient(135deg, var(--teal-200), var(--cyan-500));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const ListContent = styled.main<ComponentsProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: ${({ $bg }) => $bg};
`;

const PokemonName = styled.h3`
  font-size: 1.5rem;
  color: var(--cyan-500);
  text-transform: uppercase;
  font-family: 'Orbitron';
`;

const CostumeList = styled.ul<ComponentsProps>`
  list-style-type: none;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  text-align: center;
  color: ${({ $color }) => $color};
`;

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const StyledButton = styled.button`
  background: transparent;
  color: var(--teal-200);
  border: 1px solid var(--teal-200);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.5px;
  font-family: 'Open Sans Condensed';
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: var(--teal-200);
    color: var(--navy-950);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.6);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.8);
  }
`;

const Filter = styled.select<ComponentsProps>`
  padding: 8px;
  font-size: 14px;
  border: 1px solid var(--teal-200);
  border-radius: 4px;
  background-color: var(--navy-900);
  color: var(--white);
  margin-bottom: 2rem;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

async function fetchRandomPokemonlist(
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

async function fetchPokemonByType(
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
}

async function fetchExtraPokemonList(
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

export const PokemonList = ({ showExtra }: PokemonListProps) => {
    const [extraPokemonList, setExtraPokemonList] = useState<PokemonData[]>([]);
    const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string>('');
    const { theme } = useContext(ThemeContext);

    const shuffleList = () => {
        setSelectedType(''); // reseta o filtro
        fetchRandomPokemonlist(setPokemonList, setIsLoading); 
    };

    useEffect(() => {
        if (selectedType) {
            fetchPokemonByType(selectedType, setPokemonList, setIsLoading);
        } else {
            fetchRandomPokemonlist(setPokemonList, setIsLoading);
        }
    }, [selectedType]);

    useEffect(() => {
        if (showExtra) {
            fetchExtraPokemonList(selectedType, setExtraPokemonList);
        }
    }, [showExtra, selectedType]);

    if (isLoading) return <div>Carregando a lista de Pokémon...</div>;

    return (
        <>


            <ListContent $bg={theme.background}>
                <Filter $bg={theme.background} $color={theme.color} onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
                    <option value="">Todos os Tipos</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">Fighting</option>
                    <option value="flying">Flying</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="rock">Rock</option>
                    <option value="bug">Bug</option>
                    <option value="ghost">Ghost</option>
                    <option value="steel">Steel</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                </Filter>
                <ListTitle>Lista de Pokemons</ListTitle>
                <StyledButton onClick={shuffleList}>Shuffle List</StyledButton>

                {pokemonList.map((pokemon) => (
                    <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                        <PokemonContainer>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <PokemonName>{pokemon.name}</PokemonName>
                            <CostumeList $color={theme.color}>
                                {pokemon.types.map((type, index) => (
                                    <li key={index}>{type.type.name}</li>
                                ))}
                            </CostumeList>
                        </PokemonContainer>
                    </Link>
                ))}

                {showExtra && extraPokemonList.map((pokemon) => (
                    <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                        <PokemonContainer>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <PokemonName>{pokemon.name}</PokemonName>
                            <CostumeList $color={theme.color}>
                                {pokemon.types.map((type, index) => (
                                    <li key={index}>{type.type.name}</li>
                                ))}
                            </CostumeList>
                        </PokemonContainer>
                    </Link>
                ))}
            </ListContent>
        </>
    );
};
