import { PokemonList } from "../components/list";

interface ListProps {
  showExtra: boolean;
}

export const List = ({ showExtra }: ListProps) => {
  return <PokemonList showExtra={showExtra} />;
};
