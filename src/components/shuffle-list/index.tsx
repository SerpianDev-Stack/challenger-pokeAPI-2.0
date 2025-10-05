import { fetchRandomPokemonlist } from "../../services";
import type { Dispatch, SetStateAction } from "react";
import type { PokemonData } from "../../types/pokemon-types";
import { GenericButton } from "../button";
import styled from "styled-components";

const ShuffleButtonStyled = styled(GenericButton)`
  /* Sobrescreve as cores para usar o Accent Color Cyan 500 */
  color: var(--cyan-500);
  border: 1px solid var(--cyan-500);
  background: transparent;
  border-radius: 5px;

  /* Estilo de Hover */
  &:hover {
    // Fundo preenchido com Cyan 500
    background-color: var(--cyan-500); 
    // Texto em alto contraste com o Navy 950 (o tom mais escuro)
    color: var(--navy-950); 
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.6);
  }
`

interface ShuffleButtonProps {
  setSelectedType: Dispatch<SetStateAction<string>>;
  setPokemonList: Dispatch<SetStateAction<PokemonData[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

// Componente React
export const ShuffleButton = ({ setSelectedType, setPokemonList, setIsLoading }: ShuffleButtonProps) => {
  const handleClick = () => {
    setSelectedType(''); // reseta o filtro
    fetchRandomPokemonlist(setPokemonList, setIsLoading);
  };

  return <ShuffleButtonStyled onClick={handleClick}>Shuffle List</ShuffleButtonStyled>;

}