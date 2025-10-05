import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import type { PokemonData } from "../../types/pokemon-types"
import styled from "styled-components";
import { ThemeContext } from "../../contexts/themeContext";
import type { ComponentsProps } from "../../types/theme-types";

type DetailContainerProps = ComponentsProps & {
  $bg: string;
};

type PokemonSpeciesData = {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
};

const DetailContainer = styled.div<DetailContainerProps>`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-image: linear-gradient(180deg, ${({ $bg }) => $bg}, ${({ $bg }) => $bg}, var(--cyan-500));
  gap: 1.5rem;
  padding: 3rem;
  color: ${({ color }) => color};

  & img {
    width: 10rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  text-align:center;
`;

const StyledID = styled.p`
  font-size: 1.5rem;
  text-transform: capitalize;
`;

const PokeTypes = styled.ul`
  list-style-type: none;
  font-size: 1.3rem;
  text-align: center;
  text-transform: capitalize;
`;

const TypeTitle = styled.h3`
  font-size: 1.5rem;
`;

const PokeName = styled.h3`
  font-size: 2rem;
  text-transform: uppercase;
`;

export const PokemonDetail = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonDetails() {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        ]);

        if (!pokemonResponse.ok) throw new Error("Pokémon não encontrado.");

        const pokemonData = await pokemonResponse.json();
        setPokemon(pokemonData);

        if (speciesResponse.ok) {
          const speciesData: PokemonSpeciesData = await speciesResponse.json();

          const ptbrDescription = speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "pt-br"
          );

          const enDescription = ptbrDescription || speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          );

          const cleanedDescription = enDescription
            ? enDescription.flavor_text.replace(/[\n\f]/g, " ")
            : "Descrição não encontrada.";
          setDescription(cleanedDescription);
        } else {
          setDescription("Descrição não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
        setPokemon(null);
        setDescription(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [id]);

  if (isLoading) return <div>Carregando detalhes do Pokémon...</div>;
  if (!pokemon) return <div>Pokémon não encontrado.</div>;

  return (
    <DetailContainer $bg={theme.background} color={theme.color}>
      <PokeName>{pokemon.name}</PokeName>
      <StyledID>Number: {pokemon.id}</StyledID>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {description && <Description>{description}</Description>}
      <TypeTitle>Type:</TypeTitle>
      <PokeTypes>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </PokeTypes>
    </DetailContainer>
  );
};
