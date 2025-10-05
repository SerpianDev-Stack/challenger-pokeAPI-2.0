import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/themeContext";
import { fetchRandomPokemonlist } from "../../services";
import { fetchPokemonByType } from "../../services";
import { fetchExtraPokemonList } from "../../services";
import type { PokemonData } from "../../types/pokemon-types";
import type { ComponentsProps } from "../../types/theme-types";
import { ShuffleButton } from "../shuffle-list";
import { FilterSelect } from "../filter-button";

interface PokemonListProps {
    showExtra: boolean;
}

const ListTitle = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  padding: 2rem;
  background-image: linear-gradient(135deg, var(--teal-200), var(--cyan-500));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

   @media (max-width: 467px) {
    padding:1rem;
    text-align:center
  }
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
`;

const CostumeList = styled.ul<ComponentsProps>`
  list-style-type: none;
  text-transform: uppercase;
  text-align: center;
  color: ${({ $color }) => $color};
`;

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const PokemonList = ({ showExtra }: PokemonListProps) => {
    const [extraPokemonList, setExtraPokemonList] = useState<PokemonData[]>([]);
    const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string>('');
    const { theme } = useContext(ThemeContext);

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

                <FilterSelect selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    $bg={theme.background}
                    $color={theme.color} />
                <ListTitle>Lista de Pokemons</ListTitle>

                <ShuffleButton setSelectedType={setSelectedType}
                    setPokemonList={setPokemonList}
                    setIsLoading={setIsLoading} />

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
