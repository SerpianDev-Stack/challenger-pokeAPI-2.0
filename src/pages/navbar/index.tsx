import { NavBar } from "../../components/navBar";

interface MenuProps {
  onToggleExtra: () => void;
  showExtra: boolean;
}

export const Menu = ({ onToggleExtra, showExtra }: MenuProps) => {
  return <NavBar onToggleExtra={onToggleExtra} showExtra={showExtra} />;
};
